exports.run = async (bot, message, args, level) => {
  const request = require('request');
  let currency = args.shift();
  let value = args.shift();
  if (!value){value = currency; currency = 'BRL';}
  if (value/1 != value) return message.reply("That's not a valid number!");
  link = `https://blockchain.info/tobtc?currency=${currency}&value=${value}`;
  request(link, function (error, response, body) {
    if(body.length > 12){
      message.channel.send('Invalid Currency!');
    }else{
      message.channel.send(`${value} ${currency} is ${body}BTC`);
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["btc"],
  permLevel: "User"
};

exports.help = {
  name: "bitcoin",
  category: "Miscelaneous",
  description: "Converts currency into bitcoin",
  usage: "bitcoin [currency] [value]",
  example: "bitcoin USD 10"
};