import { Schema, models, model } from "mongoose";

export interface IKillerPower {
  powerId: number;
  powerName: string;
  powerCode: string;
  killerCode: string;
  description: string;
  powerImg: string[];
}

const killerPowerSchema = new Schema<IKillerPower>({
  powerId: { type: Number, required: true },
  powerName: { type: String, required: true },
  powerCode: { type: String, required: true },
  killerCode: { type: String, required: true },
  description: { type: String, required: true },
  powerImg: [
    {
      type: String,
      required: true,
    },
  ],
});

export default models.KillerPower ||
  model<IKillerPower>("KillerPower", killerPowerSchema);
