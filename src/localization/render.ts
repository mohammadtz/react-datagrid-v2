import fa from "./fa.json";
import en from "./en.json";

export type ILocalization = "fa" | "en";

export const renderMessage = (e?: ILocalization) => {
  if (e === "fa") return fa;
  return en;
};
