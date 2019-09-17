exports.run = async (bot, message, args, level) => { // eslint-disable-line no-unused-vars
  const time = new Date();
  const fs = require('fs');
  const Discord = require('discord.js');
  var jseconds = time.getTime();
  var pokes = bot.getPokemon.get(message.author.id);
  var carteira = bot.getData.get(message.author.id);
  var switched  = args.shift();
  
  if (!pokes) pokes = { id: message.author.id, user: message.author.id, pokemon: "" , time: '0', name: message.author.username, pkcount: 0, pkalert: 'false', trainer: '001'};
  pokes.pkcount = parseInt(pokes.pkcount + 1);
  if (jseconds - pokes.time < 3600000){
    bot.setPokemon.run(pokes);
    return message.reply("You are in cooldown and will be able to catch another pokemon and get more <:allescoin:476710067639681030> in \`" + ((3600000 - (jseconds - pokes.time)) / 60 / 1000).toFixed(0) + " minutes.\`");
  }
  let moni = bot.getRandom(0,20);
  carteira.money += parseInt(moni);
  let rand = Math.floor(bot.getRandom(0,806));
  let shiny = bot.getRandom(0,4096);
  let pokevar = bot.pokenum[rand].names.en.toLowerCase().replace('-','').replace(":","").replace(" ","").replace(".","");
  let pokelink;
  if(shiny == 1){
    pokelink = 'http://play.pokemonshowdown.com/sprites/xyani-shiny/' + pokevar + '.gif';
    ishiny = ' shiny';
    shin = '✮';
  }else{
    pokelink = 'http://play.pokemonshowdown.com/sprites/xyani/' + pokevar + '.gif';
    ishiny = '';
    shin = '';
  }
  let embed = new Discord.RichEmbed()
  .setColor(message.member.displayColor)
  .setImage(pokelink)
  .addField(`Hey, you caught a${ishiny}** ${bot.pokenum[rand].names.en} **`, "*Height: " + bot.pokenum[rand].height_eu+ " Weight: " + bot.pokenum[rand].weight_eu + "*")
  .setFooter(message.author.username + ', you won ' + moni + ' allescoins!', message.author.avatarURL);
  
  if(bot.pokenum[rand].types.length > 1){
    let type1 = bot.pokenum[rand].types[0].toLowerCase();
    let type2 = bot.pokenum[rand].types[1].toLowerCase();
    var link = './images/types/' + type1 + type2 + '.png';
    embed.setThumbnail("attachment://type.png")
    if (fs.existsSync(link)) {
      message.channel.send({ embed, files: [{ attachment: './images/types/' + type1 + type2 + '.png', name: 'type.png' }] });
    }else{
      message.channel.send({ embed, files: [{ attachment: './images/types/' + type2 + type1 + '.png', name: 'type.png' }] }); 
    }
  }else{
    var typelink = "https://nintendowire.com/wp-content/themes/nintendoinq-v2.0/images/type-" + bot.pokenum[rand].types[0].toLowerCase() + ".png";
    embed.setThumbnail(typelink);
    message.channel.send({embed});
  }
  
  if(pokes.pokemon == ""){
    pokes.pokemon = shin + bot.pokenum[rand].national_id;
  } else{
    pokes.pokemon += "," + shin + bot.pokenum[rand].national_id;
  }  
  if(switched == 'on') pokes.pkalert = 'true';
  if(switched == 'off') pokes.pkalert = 'false';
  if(pokes.pkalert == 'true'){
    //30
    message.reply('You\'ll be reminded to catch another pokemon in 60 min!')
    setTimeout(() => {
      message.reply("Another charge of .pokemon is ready!");
    }, 3600000)
  }
  pokes.time = jseconds;
  pokes.name = message.author.username;
  bot.setPokemon.run(pokes);
  bot.setData.run(carteira);
  let canal = message.guild.channels.find('name','pokelog');
  if(!canal) return;
  if(!bot.lendarray.includes(bot.pokenum[rand].names.en)) return;
  canal.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["poke", "pk"],
  permLevel: "User"
};

exports.help = {
  name: "pokemon",
  category: "Pokémon",
  description: "Allows you to catch a pokemon from hour to hour",
  usage: "pokemon [on/off]",
  example: "pokemon on"
};


