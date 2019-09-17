exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js')
  if(!args[0]) args[0] = 'vazio';
  var person = bot.users.get(args[0]) || bot.users.find("username",args[0]) || message.mentions.users.first() || message.author;
  var pokes = bot.getPokemon.get(person.id)
  var data = bot.getData.get(person.id)
  var betcount = data.betcount,
  topbet = data.topbet,
  toSend = pokes.pokemon.split(","),
  lendarios = 0,
  pkcount = pokes.pkcount,
  output = '',
  highestTotal = 0,
  highestPoke = '',
  tipos = new Map(),
  i = 0;
  gen1 = 0, gen2 = 0, gen3 = 0, gen4 = 0, gen5 = 0, gen6 = 0, gen7 = 0; 
  for(x in toSend){
    fix = toSend[x] -1;
    if(bot.lendarray.includes(bot.pokenum[fix].names.en)) lendarios++;
    var total = bot.pokenum[fix].base_stats.hp + bot.pokenum[fix].base_stats.atk + bot.pokenum[fix].base_stats.sp_atk + bot.pokenum[fix].base_stats.def + bot.pokenum[fix].base_stats.sp_def + bot.pokenum[fix].base_stats.speed;
    if(total > highestTotal){
      highestTotal = total;
      highestPoke = bot.pokenum[fix].names.en;
    }
    if(bot.pokenum[fix].national_id > 721){
      gen7++
    }else if(bot.pokenum[fix].national_id > 649){
      gen6++
    }else if(bot.pokenum[fix].national_id > 493){
      gen5++; 
    }else if(bot.pokenum[fix].national_id > 386){
      gen4++; 
    }else if(bot.pokenum[fix].national_id > 251){
      gen3++; 
    }else if(bot.pokenum[fix].national_id > 151){
      gen2++; 
    }else{
     gen1++;
    }
    if(bot.pokenum[fix].types.length > 1){
      tipoatual = tipos.get(bot.pokenum[fix].types[0]) == undefined ? 0 : tipos.get(bot.pokenum[fix].types[0]);
      tipoatual2 = tipos.get(bot.pokenum[fix].types[1]) == undefined ? 0 : tipos.get(bot.pokenum[fix].types[1]);
      tipos.set((bot.pokenum[fix].types[0]), tipoatual + 1);
      tipos.set((bot.pokenum[fix].types[1]), tipoatual2 + 1);
    }else{
      tipoatual = tipos.get(bot.pokenum[fix].types[0]) == undefined ? 0 : tipos.get(bot.pokenum[fix].types[0]);
      tipos.set((bot.pokenum[fix].types[0]), tipoatual + 1);
    }
  }
  for (var [key, value] of tipos) {
    output += bot.emojis.find("name", key.toLowerCase()) + ' ' + key.toProperCase() + ': ' + value + (a = i%2 == 0 ? '    ' : '\n');
    i++;
  }
  let trainerlink = pokes.trainer.indexOf('http') < 0 ? 'http://play.pokemonshowdown.com/sprites/trainers-ordered/' + pokes.trainer + '.png' : pokes.trainer;
  genput = 'Gen I: ' + gen1 + '\n' + 'Gen II: ' + gen2 + '\n' + 'Gen III: ' + gen3 + '\n' + 'Gen IV: ' + gen4 + '\n' + 'Gen V: ' + gen5 + '\n' + 'Gen VI: ' + gen6 + '\n' + 'Gen VII: ' + gen7;
  let pokevar = highestPoke.toLowerCase().replace('-','').replace(":","").replace(" ","").replace(".","");
  let embed = new Discord.RichEmbed();
  embed.setAuthor('Pokemon Stats for ' + person.username, person.avatarURL).setColor("#ff69b4")
  .addField('Times used .pokemon', pkcount, true)
  .addField('Times used .bet', betcount, true)
  .addField('Highest bet', topbet, true)
  .addField('Legendary Pokemon', lendarios, true)
  .addField('Pokemons by Type', output, true)
  .addField('Pokemons by Generation', genput, true)
  .setFooter('Highest Stats Pokemon: ' + highestPoke + '(' + highestTotal + ')')
  .setImage('http://play.pokemonshowdown.com/sprites/xyani/' + pokevar + '.gif')
  .setThumbnail(trainerlink)
  
  message.channel.send({embed})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pkstats"],
  permLevel: "User"
};

exports.help = {
  name: "pokestats",
  category: "Pokémon",
  description: "Shows interesting stats about your pokejourney",
  usage: "pokestats",
  example: "pokestats"
};