import { Schema, model, models } from "mongoose";

export interface IItem {
  name: string;
  code: string;
  type: string;
  rarity: string;
  description: string;
  icon: string;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  rarity: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  icon: { type: String, required: true, unique: true },
});

export default models.Item || model<IItem>("Item", itemSchema);
