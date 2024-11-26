import { atom } from "jotai";
import { Remedio } from "./interfaces/Remedio";

export const remediosAtom = atom<Remedio[]>([]);
