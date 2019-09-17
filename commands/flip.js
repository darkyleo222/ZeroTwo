exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js');
  let aposta = args.shift();
  let embed = new Discord.RichEmbed();
  let flip = bot.getRandom(0,1) == 1 ? 'heads' : 'tails'
  if((aposta == 'tails' && flip == 'tails') || (aposta == 'heads' && flip == 'heads')){
    resultado = 'Congrats, you won!';
  }else if(!aposta){
    resultado = 'That\'s what i got flipping a coin uwu';
  }
  else if(aposta != 'tails' && aposta != 'heads'){
    return message.channel.send('That\'s not a valid bet!');
  }else{
    resultado = 'Better luck next time uwu';
  }
  embed.setAuthor(message.author.username,message.author.avatarURL)
  .addField("\u200b", resultado)
  .setColor("#ff69b4")
  .setThumbnail("attachment://" + flip + ".png")
  message.channel.send({embed, files: [{ attachment: flip + '.png', name: flip + '.png' }]})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "flip",
  category: "Minigames",
  description: "Flips a coin",
  usage: "flip [heads/tails]",
  example: "flip heads"
};