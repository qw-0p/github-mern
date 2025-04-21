import { Document, Types, Schema, model } from "mongoose"

// Власник проєкту
// Назва проєкту
// URL проєкту
// Кількість зірок (stars)
// Кількість відгалужень (forks)
// Кількість відкритих питань (issues)
// Дата створення у форматі UTC Unix timestamp
// Кнопки: оновити та видалити

export interface IContent extends Document {
  owner: string
  name: string
  url: string
  stars: number
  forks: number
  issues: number
  createdAt: Date
  user: Types.ObjectId
}

const itemSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    forks: {
      type: Number,
      required: true,
    },
    issues: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default model<IContent>("Content", itemSchema)
