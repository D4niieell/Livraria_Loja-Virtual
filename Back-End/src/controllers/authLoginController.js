import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateTokens from "../utils/generateTokens.js";
import tokenModels from "../models/tokenModels.js"; 
import userModels from "../models/userModels.js";

dotenv.config();

class AuthLoginController {
    async login (req, res) {
        const { user_email, user_password } = req.body;

        const [emailExists] = await userModels.selectUserByEmail(user_email);

        if (!emailExists) {
            return res.ststus(400).json({
                error: "Email ou senha são inválidos!",
            });
        }

        const validatePassword = await bcrypt.compare(
            user_password, emailExists.user_password
        );

        if (!validatePassword) {
            return res.status(400).json({
                error: "Esta senha é inválida!",
            });
        }

        const accessToken = generateTokens.generateAccesssToken(emailExists);
        const refreshToken = generateTokens.generateRefreshToken(emailExists);

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 dias
        
        const savedToken = await tokenModels.createToken({
            user_id: emailExists.user_id,
            token: refreshToken,
            expires_at: expiresAt
        })

        if (savedToken.affectedRows === 0) {
            return res.status(500).json({
                error: "Erro ao tentar criar token!"
            })
        }

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECRET,
            sameSite: "strict",
            maxAge: 604800000,
        });

        return res.json({
            success: "Login realizado com sucesso!",
            accessToken
        });
    }

    async logout (req, res) {
        const refreshToken = req.cookies?.refreshToken;
        const deleteToken = await tokenModels.deleteToken(refreshToken);

        res.clearCookie("refreshToken");
        if (deleteToken.affectedRows > 0) {
            return res.status(201).json({
                success: "Logout efetuado com sucesso!"
            });
        }

        return res.status(500).json({
            error: "Erro ao deletar o token!"
        })
    }
}
export default new AuthLoginController();