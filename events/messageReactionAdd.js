module.exports = (bot, messageReaction, user) => {
    const Discord = require('discord.js')
    const message = messageReaction.message;
    if(!message.settings) return;
    const settings = message.settings;
    if(message.author.id == bot.user.id) return;
    if(messageReaction.count > 1 && messageReaction.users.has(messageReaction.users.last().id)) return;
    let canal = message.guild.channels.find('name', settings.starboard);
    if (!canal) return;
    if(messageReaction.emoji.name == settings.staremote){
        let embed = new Discord.RichEmbed().setColor(message.member.displayColor)
        .setDescription(message.toString())
        .setAuthor(message.author.username,message.author.avatarURL)
        .setTimestamp(message.createdAt)
        canal.send({embed})
    }
};
