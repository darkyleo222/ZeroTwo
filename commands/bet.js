exports.run = async (bot, message, args, level) => {
  let aposta = args.shift();
  let valor = args.shift();
  let carteira = bot.getData.get(message.author.id);
  betcount = carteira.betcount || 0;
  betcount++;
  carteira.betcount = betcount;
  if(!valor || !aposta || valor/1 != valor || valor < 1 || (aposta != 'heads' && aposta != 'tails')) return message.reply('Invalid bet format! Use bet [heads/tails] [value]');
  if((carteira.money - valor) < 0) return message.reply('You can\'t bet more than what you have in your wallet!');
  let bet = bot.getRandom(0,1);
  if(bet == 0 && aposta == 'tails' || bet == 1 && aposta == 'heads'){
    carteira.money += parseInt(valor);
    message.reply('Congrats!, You won ' + valor + '<:allescoin:476710067639681030> and now have ' + carteira.money)
  }else{
    carteira.money -= parseInt(valor);
    message.reply('Better luck next time, You lost ' + valor + '<:allescoin:476710067639681030> and now have ' + carteira.money)
  }
  if(valor > carteira.topbet) carteira.topbet = valor;
  bot.setData.run(carteira);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bet",
  category: "Minigames",
  description: "Bet heads or tails using allescoins!",
  usage: "bet [heads/tails] [value]",
  example: "bet tails 10"
};