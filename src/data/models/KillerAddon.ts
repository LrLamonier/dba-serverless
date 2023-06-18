import { Schema, model, models } from "mongoose";

export interface IKillerAddon {
  killerId: number;
  killerCode: string;
  powerCode: string;
  name: string;
  addonCode: string;
  rarity: string;
  description: string;
  icon: string;
}

const killerAddonSchema = new Schema<IKillerAddon>({
  killerId: { type: Number, required: true },
  killerCode: { type: String, required: true },
  powerCode: { type: String, required: true },
  name: { type: String, required: true },
  addonCode: { type: String, required: true },
  rarity: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

export default models.KillerAddon ||
  model<IKillerAddon>("KillerAddon", killerAddonSchema);
