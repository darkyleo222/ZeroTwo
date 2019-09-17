exports.run = async (bot, message, args, level) => {
  let channel = bot.channels.get('455529975781654548');
  const Discord = require('discord.js');
  channel.fetchMessages({limit:90}).then((m) =>{
    fetched = m.array();
    let links = [];
    let embed = new Discord.RichEmbed().setFooter(message.author.username, message.author.avatarURL).setColor(message.member.displayColor)
    for(x in fetched){
      if(fetched[x].attachments.first() != undefined){
        links.push({url: (fetched[x].attachments.first().url), name: fetched[x].author.username, time: fetched[x].createdTimestamp})
      } 
    }
    a = bot.getRandom(0,links.length - 1);
    let tempo = new Date(links[a].time)
    embed.setTitle("Pérola postada por " + links[a].name).setTimestamp(tempo)
    embed.setImage(links[a].url)
    message.channel.send({embed})
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "perola",
  category: "Miscelaneous",
  description: "Sends a random perola",
  usage: "perola",
  example: "perola"
};