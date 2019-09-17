exports.run = async (bot, message, args, level) => {
  let sugs = args.join(" ");
  const Discord = require('discord.js')
  if(!sugs){
    suggestions = JSON.parse(bot.sql('SELECT user, oid, suggestion FROM suggestions'))
    let embed = new Discord.RichEmbed().setColor(message.member.displayColor);
    let output = '';
    for(x in suggestions){
      output += '**' + suggestions[x].rowid + '** *' + suggestions[x].user + ':* ' + '`' + suggestions[x].suggestion + '`' + '\n'
    }
    embed.setTitle('Suggestions')
    embed.setDescription(output);
    return message.channel.send({embed})
  }
  let godata = {user: message.author.username, suggestion: sugs}
  bot.setSuggestion.run(godata);
  message.reply('Suggestion submited!')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sgst"],
  permLevel: "User"
};

exports.help = {
  name: "suggestion",
  category: "Code",
  description: "Sends a suggestion to the bot owner",
  usage: "suggestion [text]",
  example: "suggestion delete the bot"
};