import userModels from "../models/userModels.js";

class userController {

    async getAllUsers(req, res) {
        try {
            const AllUsers = await userModels.selectAllUsers();
            if (AllUsers.length === 0) {
                return res.status(404).json({
                    error: "Nenhum usuario encontrado!"
                })
            }
            return res.status(200).json(AllUsers);
        } catch (error){
            return res.status(500).json({
                error: "Erro ao buscar usuários"
            });
        }
    }

    async getUsersById(req, res) {
        try {
            const { id } = req.params;

            if (userById.length === 0) {
                return res.status(404).json({
                    error: "Usuário não encontrado!"
                })
            }
            return res.status(200).json(userById);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao buscar usuário!"
            })
        }
    }

    async getUserByEmail (req, res) {
        try {
            const {user_email} = req.params;
            const userByEmail = await userModels.selectUserByEmail(user_email);

            if (userByEmail) {
                return res.status(200).json({
                    error: "Este e-mail já está cadastrado no sistema!"
                });
            }
            return res.status(200).json(userByEmail);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao buscar usuário por email!"
            });
        }
    }

    async createUser (req, res) {
        try {
            const existsUser = await userModels.selectUserByEmail(
                req.body.user_email
            );
            
            if (existsUser) {
                return res.status(400).json({
                    error: "Este email já está cadastrado no sistema!"
                });
            } 
            const newUser = await userModels.insertUser(req.body); 

            if (newUser.affectedRows > 0) {
                return res.status(200).json({
                    success: "Usuário cadastrado com sucesso!"
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao criar um novo usuário!",
            });
        }
    }
}