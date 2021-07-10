import { CommandInt } from "../../interfaces/CommandInt";
import UserModel from "../../database/models/UserModel";

export const daily: CommandInt = {
    name: "daily",
    description: "claim daily bonus",
    run: async (message) => {
        const { author, channel, content } = message;

        let targetUser = await UserModel.findOne({discordId: author.id})

        if(!targetUser) {
            await channel.send("<@" + author + ">" + " you haven't initialized a profile! Use ,start to initialize your profile and begin playing Clover. :four_leaf_clover: ")
        } else {
            if(targetUser.lastDaily != -1){
                var hours = Math.abs(Date.now() - targetUser.lastDaily) / 36e5;
                if(hours < 24) {
                    await channel.send("<@" + author + ">" + " you have " + Math.abs(24 - hours) + " hours left before your next daily! :alarm_clock: ")
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
            await channel.send("<@" + author + ">" + " you have claimed your daily! :four_leaf_clover: Your current balance = " + targetUser.currency + ". Streak = " + targetUser.dailyStreak)
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
            await channel.send("<@" + author + ">" + " you haven't initialized a profile! Use ,start to initialize your profile and begin using the bot.")
        } else {
            await channel.send("<@" + author + ">" + " your current balance is " + targetUser.currency)
        }

    }
}

export const start: CommandInt = {
    name: "start",
    description: "make your profile",
    run: async (message) => {
        const { author, channel, content } = message;

        let targetUser = await UserModel.findOne({discordId: author.id})

        if(!targetUser) {
            targetUser = await UserModel.create({
                discordId: author.id,
                currency: 100,
                lastDaily: -1,
                dropNext: "none",
                claimNext: "none",
                dailyStreak: 0,
                privateInv: false,
                ban: false
            })
            await channel.send("<@" + author + ">" + " profile initiated!")
        } else {
            await channel.send("<@" + author + ">" + " you already have a profile!")
        }
    }
}