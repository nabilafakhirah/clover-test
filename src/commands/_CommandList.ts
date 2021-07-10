import { CommandInt } from "../interfaces/CommandInt";
import { daily, start, balance } from "./commandSpecifications/dailyInit";

export const CommandList: CommandInt[] = [daily, start, balance];