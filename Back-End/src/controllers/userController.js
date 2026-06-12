import bcrypt from "bcrypt";
import userModels from "../models/userModels.js";

class userController {
  async getAllUsers(req, res) {
    try {
      const AllUsers = await userModels.selectAllUsers();
      if (AllUsers.length === 0) {
        return res.status(404).json({
          error: "Nenhum usuario encontrado!",
        });
      }
      return res.status(200).json(AllUsers);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar usuários",
      });
    }
  }

  async getUsersById(req, res) {
    try {
      const { user_id } = req.params;

      const userById = await userModels.selectUserById(user_id);

      if (userById.length === 0) {
        return res.status(404).json({
          error: "Usuário não encontrado!",
        });
      }
      return res.status(200).json(userById);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar usuário!",
      });
    }
  }

  async getUserByEmail(req, res) {
    try {
      const { user_email } = req.params;
      const [userByEmail] = await userModels.selectUserByEmail(user_email);

      if (!userByEmail) {
        return res.status(404).json({
          error: "Usuário não encontrado!",
        });
      }
      return res.status(200).json(userByEmail);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar usuário por email!",
      });
    }
  }

  async createUser(req, res) {
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id,
        user_status,
      } = req.body;

      const [existsUser] = await userModels.selectUserByEmail(
        req.body.user_email
      );

      if (existsUser) {
        return res.status(400).json({
          error: "Este email já está cadastrado no sistema!",
        });
      }
      const hashedPassword = await bcrypt.hash(user_password, 10);

      const newUser = await userModels.insertUser({
        user_name,
        user_email,
        user_password: hashedPassword,
        user_phone,
        role_id,
        user_status,
      });

      if (newUser.affectedRows > 0) {
        return res.status(200).json({
          success: "Usuário cadastrado com sucesso!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao criar um novo usuário!",
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { user_id } = req.params;
      const {
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id,
        user_status,
      } = req.body;

      const [existsUser] = await userModels.selectUserByEmail(
        user_email,
        user_id
      );

      if (existsUser) {
        return res.status(400).json({
          error: "Este email já está cadastrado no sistema!",
        });
      }

      const [existsPassword] = await userModels.selectAllUsers(user_id);

      if (user_password) {
        const comperingPassword = await bcrypt.compare(
          user_password,
          existsPassword.user_password
        );

        if (comperingPassword) {
          const result = userModels.updateUser(user_id, req.body);

          if (result.affectedRows > 0) {
            return res.status(200).json({
              success: "Usuário atualizado com sucesso!",
            });
          }
        }
      }

      const hashedPassword = await bcrypt.hash(user_password, 10);

      const result = await userModels.updateUser(user_id, {
        user_name,
        user_email,
        user_password: hashedPassword,
        user_phone,
        role_id,
        user_status,
      });

      if (result.affectedRows > 0) {
        return res.status(200).json({
          success: "Usuario atualizado com sucesso!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar usuário!",
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { user_id } = req.params;
      
      const result = await userModels.deleteUser(user_id);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          sucess: "Usuário deletado com sucesso!"
        })
      }
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar usuário!",
      })
    }
  }

}

export default new userController();
