exports.run = async (bot, message, args, level) => {
  let carteira = bot.getData.get(message.author.id);
  if(!carteira) return message.reply('Wallet created! Now you can start your bets, good luck!');
  message.reply('You have ' + carteira.money + '<:allescoin:476710067639681030>')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "wallet",
  category: "Minigames",
  description: "Shows how much allescoins you have",
  usage: "wallet",
  example: "wallet"
};