import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateTokens from "../utils/generateTokens.js";
import tokenModels from "../models/tokenModels.js"; 
import userModels from "../models/userModels.js";
import jwt from "jsonwebtoken";

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

        const accessToken = generateTokens.generateAccessToken(emailExists);
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
            // secure: process.env.COOKIE_SECRET,
            secure: false,
            sameSite: "strict",
            maxAge: 604800000,
        });

        return res.json({
            success: "Login realizado com sucesso :)",
            accessToken
        });
    }

    async refreshToken (req, res) {
        const RFToken = req.cookies.refreshToken;

        if (!RFToken) {
            return res.status(401).json({
                error: "ERRO! Token não fornecido"
            })
        }

        const [tokenExists] = await tokenModels.selectByToken(RFToken)

        if (!tokenExists) {
            return res.status(401).json({
                error: "ERRO! Token inválido"
            })
        }

        jwt.verify(RFToken, process.env.REFRESH_TOKEN_SECRET,
            async (error, usuarioDecodificado) => {
                if (error) {
                    return res.status(403).json({
                        error: "Token inválido ou expirado!"
                    })
                }
                
                await tokenModels.deleteToken(RFToken);

                const {
                    iat, exp, ...userData
                } = usuarioDecodificado;

                const accessToken = generateTokens.generateAccessToken(userData);
                const newRefreshToken = generateTokens.generateRefreshToken(userData);

                const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 dias
                
                const savedToken = await tokenModels.createToken({
                    user_id:
                })
            }
        )
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