import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";

const prefix = "cl!"
export const onMessage = async (message: Message) => {
    if (message.author.bot) {
        return;
    }
    if(!message.content.startsWith(prefix)) {
        return
    }
    for (const Command of CommandList) {
        if (message.content.startsWith(prefix + Command.name)) {
          await Command.run(message);
          break;
        }
    }
};