import { Document, Schema, model, Types } from "mongoose"

export interface IToken extends Document {
  userId: Types.ObjectId
  refreshToken: string
  expiresAt: Date
}

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default model<IToken>("Token", tokenSchema)
