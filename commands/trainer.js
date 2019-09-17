exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js');
  let trainer = args.shift();
  let set = args.shift();
  if(!trainer && !set){
    let embed = new Discord.RichEmbed();
    embed.setColor(message.member.displayColor).setTitle('All Trainers List!').setImage('http://play.pokemonshowdown.com/sprites/trainers-sheet.png')
    return message.channel.send({embed});
  }
  carteira = bot.getData.get(message.author.id);
  pokes = bot.getPokemon.get(message.author.id);
  if(trainer == 'custom'){
    if(carteira.money < 500) return message.reply('You don\'t have 500<:allescoin:476710067639681030> to change your trainer to a custom Image!');
    if(!set) return message.reply('You must inform the link to the custom image!')
    if((set.indexOf('.png') < 0 && set.indexOf('.jpg') < 0) || set.indexOf('http') < 0) return message.reply('That\'s not a valid png or jpg image!');
    pokes.trainer = set;
    carteira.money -= 500;
    bot.setPokemon.run(pokes);
    bot.setData.run(carteira);
    return message.channel.send('Custom trainer image set!')
  }
  if(trainer < 10) trainer = '00' + trainer;
  else if(trainer < 100) trainer = '0' + trainer;
  if(trainer < 1 || trainer > 294 || trainer/1 != trainer || trainer.length > 3) return message.reply('The trainer must be a number between 1 and 294!')
  embed = new Discord.RichEmbed().setColor(message.member.displayColor).setImage('http://play.pokemonshowdown.com/sprites/trainers-ordered/' + trainer + '.png')
  if(!set){
    embed.setTitle('This is how trainer number ' + trainer + ' looks like!');
    return message.channel.send({embed});
  }
  if(set == 'buy'){
    embed.setTitle('Trainer changed to ' + trainer + '!');
    if(carteira.money < 200) return message.reply('You don\'t have 200<:allescoin:476710067639681030> to change your trainer!')
    carteira.money -= 200;
    pokes.trainer = trainer;
    bot.setPokemon.run(pokes);
    bot.setData.run(carteira);
    message.channel.send({embed});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "trainer",
  category: "Pokémon",
  description: "Allows you to check the trainers available or change your trainer for 200 AllesCoins, or set a custom image for 500 AllesCoins",
  usage: "trainer [number from 1 to 294 or custom] buy",
  example: "trainer 284 buy"
};