exports.run = async (bot, message, args, level) => {
  if(message.channel.id != '453314806674358292') return;
  if(message.member.roles.has('458430492308537355')) return message.reply('You already have the giveaway role!');
  message.member.addRole('458430492308537355');
  message.reply('Giveaway role successfully added. Enjoy the giveaways!');
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "giveaway",
  category: "Miscelaneous",
  description: "Adds you the giveaway role",
  usage: "giveaway",
  example: "giveaway"
};