import { Document, Schema, model } from "mongoose"
import argon2 from 'argon2'

export interface IUser extends Document {
  email: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    this.password = await argon2.hash(this.password)
    next()
  } catch (error: any) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return argon2.verify(this.password, candidatePassword)
}

export default model<IUser>("User", userSchema)
