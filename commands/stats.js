const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (bot, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  let embed = new Discord.RichEmbed();
  embed.setTitle("Zero Two Statistics")
  .setThumbnail(bot.user.avatarURL)
  .setColor("#ff69b4")
  .setFooter("Creator: nyan leo#0002", bot.users.get('272019229073604609').avatarURL)
  .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)
  .addField("• Uptime", ` ${duration}`,true)
  .addField("• Users", ` ${bot.users.size.toLocaleString()}`,true)
  .addField("• Servers", ` ${bot.guilds.size.toLocaleString()}`,true)
  .addField("• Channels", ` ${bot.channels.size.toLocaleString()}`,true)
  .addField("• Discord.js", ` v${Discord.version}`,true)
  .addField("• NodeJS", ` ${process.version}`,true);
  message.channel.send({embed})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics",
  usage: "stats",
  example: "stats"
};
