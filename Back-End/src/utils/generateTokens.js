import jwy from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class GenerateTokens {
  generateAccesssToken(user) {
    const accessToken = Jwt.sign(
      {
        id: user.user_id,
        email: user.user_email,
        role: user.role_name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15ms" }
    );

    return accessToken;
  }

  generateRefreshToken(user) {
    const generateRefreshToken = Jwt.sign(
      {
        id: user.user_id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7ds" }
    );

    return refreshToken;
  }
}
export default new GenerateTokens();
