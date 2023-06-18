import { Schema, model, models } from "mongoose";

export interface ISurvivorPerk {
  id: number;
  name: string;
  code: string;
  survivorCode: string;
  survivorName: string;
  description: string;
  icon: string;
}

const survivorPerkSchema = new Schema<ISurvivorPerk>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  survivorCode: { type: String, required: true },
  survivorName: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

export default models.SurvivorPerk ||
  model<ISurvivorPerk>("SurvivorPerk", survivorPerkSchema);
