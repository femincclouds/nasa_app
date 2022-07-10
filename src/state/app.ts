import create from "zustand";
import { createSelectors } from "./state";
import { emptyFunction } from "../utils/common";

const initialState: IAppState = {
  asteroidInfo: {},
  asteroidIds: [],
  setAsteroidIds: emptyFunction,
  setAsteroidInfo: emptyFunction,
};

export const useAppState = create<IAppState>((set, get) => ({
  ...initialState,
  setAsteroidIds: (asteroidIds) => set({ asteroidIds }),
  setAsteroidInfo: (asteroidInfo) => set({ asteroidInfo }),
}));

export const appStateSelectors = createSelectors(initialState);

export interface IAppState {
  asteroidIds: string[];
  setAsteroidIds: (asteroidIds: string[]) => void;
  asteroidInfo: any;
  setAsteroidInfo: (asteroidInfo: any) => void;
}
