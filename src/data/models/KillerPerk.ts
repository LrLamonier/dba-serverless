import { Schema, model, models } from "mongoose";
import { prop, modelOptions, Severity } from "@typegoose/typegoose";

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class KillerPerk {
  @prop({ required: true })
  id: number;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  code: string;

  @prop({ required: true })
  killerCode: string;

  @prop({ required: true })
  killerName: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  icon: string;
}

export interface IKillerPerk {
  id: number;
  name: string;
  code: string;
  killerCode: string;
  killerName: string;
  description: string;
  icon: string;
}

const killerPerkSchema = new Schema<IKillerPerk>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  killerCode: { type: String, required: true },
  killerName: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

export default models.KillerPerk ||
  model<IKillerPerk>("KillerPerk", killerPerkSchema);
