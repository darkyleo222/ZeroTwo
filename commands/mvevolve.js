exports.run = async (bot, message, args, level) => {
  const fs = require('fs');
  const Discord = require('discord.js');
  const didyou = require('didyoumean');
  let pokemon = args.shift();
  pksearch(pokemon);
  async function pksearch(pokemon){
    pokemon = pokemon.toLowerCase();
    let pokson = pokemon.replace("*", "").replace("-","_").replace(".","_").replace(":","_").replace(" ","_");
    let embed = new Discord.RichEmbed().setTitle("MOVES THAT ARE LEARNED EARLIER").setColor(message.member.displayColor);
    try{
      var dados = JSON.parse(fs.readFileSync("./pokemon/" + pokson + ".json"));
      pokevo = dados.evolutions[0].to;
      pokevo = pokevo.replace("*", "").replace("-","_").replace(".","_").replace(":","_").replace(" ","_");
      var dadosevo = JSON.parse(fs.readFileSync("./pokemon/" + pokevo + ".json"));
      moves = dados.move_learnsets[dados.move_learnsets.length - 1].learnset;
      movesevo = dadosevo.move_learnsets[dadosevo.move_learnsets.length - 1].learnset;
      same = [];
      for(x in moves){
        for(y in movesevo){
          if(moves[x].move == movesevo[y].move && (moves[x].level && movesevo[y].level != null) && moves[x].level < movesevo[y].level){
            same[x] = {name: moves[x].move, level: moves[x].level, levelevo: movesevo[y].level}
          }
        }
      }
      let pokevar = dados.names.en.toLowerCase().replace('-','').replace(":","").replace(" ","").replace(".","");
      embed.setThumbnail('http://play.pokemonshowdown.com/sprites/xyani/' + pokevar + '.gif');
      embed.setDescription(dados.names.en + ' evolves at lvl ' + dados.evolutions[0].level)
      for(a in same){
        embed.addField(same[a].name, 'lvl' + same[a].level + ' / lvl' + same[a].levelevo, true);
      }
      message.channel.send({embed});
    }catch(error){
        message.channel.send('Pokemon/Evolution not found!');
    }
  }
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mvevolve",
  category: "Pokémon",
  description: "base",
  usage: "base",
  example: "base"
};