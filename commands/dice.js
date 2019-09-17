exports.run = async (bot, message, args, level) => {
  let faces = args.shift();
  if (faces < 1 || faces/1 != faces) return message.channel.send("That's not a valid number!"); 
  message.channel.send(`You played a ${faces} faces dice and got ${bot.getRandom(1,faces)}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "dice",
  category: "Minigames",
  description: "Roll a dice",
  usage: "dice [number]",
  example: "dice 8"
};