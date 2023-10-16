import sortBy from "lodash/fp/sortBy";
import { chainSettings as settings } from "./chains";

export const chainSettings = settings;

export type TokenAtomic =
  (typeof chainSettings)[keyof typeof chainSettings]["baseDenom"];

export type AvailableChain = keyof typeof settings;

export const chainOptions: {
  label: (typeof chainSettings)[keyof typeof chainSettings]["prettyNetworkName"];
  value: AvailableChain;
}[] = sortBy(
  "label",
  Object.entries(chainSettings).map(
    ([chainId, { prettyNetworkName: label }]) => ({
      label,
      value: chainId as AvailableChain,
    })
  )
);
