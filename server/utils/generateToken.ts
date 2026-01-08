import jwt, { Secret } from "jsonwebtoken";

export function generateToken(id: string) {
  const secret = process.env.JWT_SECRET as Secret;

  return jwt.sign(
    { id },
    secret,
    {
      expiresIn: "30d",
    }
  );
}

