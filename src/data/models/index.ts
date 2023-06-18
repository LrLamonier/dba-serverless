import ItemModel from "./Item";
import ItemAddonModel from "./ItemAddon";
import KillerModel from "./Killer";
import KillerAddonModel from "./KillerAddon";
import KillerPerkModel from "./KillerPerk";
import KillerPowerModel from "./KillerPower";
import SurvivorModel from "./Survivor";
import SurvivorPerkModel from "./SurvivorPerk";

interface IModels {
  [key: string]: any;
}

const models: IModels = {
  item: ItemModel,
  "item-addon": ItemAddonModel,
  killer: KillerModel,
  "killer-addon": KillerAddonModel,
  "killer-perk": KillerPerkModel,
  "killer-power": KillerPowerModel,
  survivor: SurvivorModel,
  "survivor-perk": SurvivorPerkModel,
};

export default models;
