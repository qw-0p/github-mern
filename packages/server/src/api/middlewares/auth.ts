import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"


interface RequestWithUserId extends Request {
  userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export const verifyToken = (req: RequestWithUserId, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
