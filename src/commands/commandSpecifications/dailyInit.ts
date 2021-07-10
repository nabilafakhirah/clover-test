import { CommandInt } from "../../interfaces/CommandInt";
import UserModel from "../../database/models/UserModel";

export const daily: CommandInt = {
    name: "daily",
    description: "claim daily bonus",
    run: async (message) => {
        const { author, channel, content } = message;

        let targetUser = await UserModel.findOne({discordId: author.id})

        if(!targetUser) {
            await channel.send("<@" + author + ">" + " you haven't initialized a profile! Do ,start to initialize a profile.")
        } else {
            if(targetUser.lastDaily != -1){
                var hours = Math.abs(Date.now() - targetUser.lastDaily) / 36e5;
                if(hours < 24) {
                    await channel.send("<@" + author + ">" + " you have " + Math.abs(24 - hours) + " hours left before your next daily!")
                    return;
                }
                
                if(hours > 48) {
                    targetUser.dailyStreak = 0
                }
            }
            targetUser.lastDaily = Date.now()
            targetUser.currency += 100
            targetUser.dailyStreak++

            targetUser.save()
            await channel.send("<@" + author + ">" + " you have claimed your daily! Your credit balance = " + targetUser.currency + ". Streak = " + targetUser.dailyStreak)
        }
    }
}

export const balance: CommandInt = {
    name: "balance",
    description: "check your balance",
    run: async (message) => {
        const { author, channel, content } = message;

        let targetUser = await UserModel.findOne({discordId: author.id})

        if(!targetUser) {
            await channel.send("<@" + author + ">" + " you haven't initialized a profile! Do ,start to initialize a profile.")
        } else {
            await channel.send("<@" + author + ">" + " you have a balance of " + targetUser.currency)
        }
    }
}
A
