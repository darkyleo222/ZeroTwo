exports.run = async (bot, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! API is ${msg.createdTimestamp - message.createdTimestamp}ms. Virtual Machine Latency is ${Math.round(bot.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["p"],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "First ping, then pongs XD",
  usage: "ping",
  example: "ping"
};
