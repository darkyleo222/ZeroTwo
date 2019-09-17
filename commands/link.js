exports.run = async (bot, message, args, level) => {
  message.delete(1000);
  let canal = args.shift();
  if(!canal) canal = message.channel.id;
  if(bot.link.has(canal)){
    bot.link.delete(canal);
    message.channel.send('Channel unlinked!').then(m=>m.delete(2000));
  }else{
    bot.link.add(canal);
    message.channel.send('Channel linked!').then(m=>m.delete(2000))
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "link",
  category: "Miscelaneous",
  description: "Links ZeroTwo to a channel",
  usage: "link",
  example: "link"
};