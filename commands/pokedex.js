exports.run = async (bot, message, args, level) => {
  if(message.channel.id == '442412417377632276') return;
  const fs = require('fs');
  const Discord = require('discord.js');
  const url = require('url-exists');
  const didyou = require('didyoumean');
  const colorObj = {Green: "#81c784",Red: "#e57373",Blue: "#64b5f6",White: "#eeeeee",Brown: "#a1887f",Yellow: "#fff176",Purple: "#ba68c8",Pink: "#f06292",Gray: "#90a4ae", Black: "#424242"}
  let pokemon = args.shift();
  pksearch(pokemon);
  async function pksearch(pokemon){
    pokemon = pokemon.toLowerCase();
    let pokson = pokemon.replace("*", "").replace("-","_").replace(".","_").replace(":","_").replace(" ","_");
    var linkfix = pokson.replace("_", "").replace(":","").replace(" ","").replace(".","");
    let forms = args.shift();
    let pokes = bot.getPokemon.get(message.author.id)
    var has = '';
    pokes = pokes.pokemon.split(",");
    try{
      var dados = JSON.parse(fs.readFileSync("./pokemon/" + pokson + ".json"));
      shiny = (pokemon.indexOf('*') > 0) ? '-shiny/' : '/';
      if(forms) linkfix += '-' + forms;
      
      var pokelink = 'http://play.pokemonshowdown.com/sprites/xyani' + shiny + linkfix + '.gif';
      //define the dex objects
      var desc = !dados.pokedex_entries.X ? Object.values(dados.pokedex_entries)[0].en : dados.pokedex_entries.X.en;
      var tipos = dados.types;
      var abil = dados.abilities;
      var status = dados.base_stats
      if(forms == 'alola' && dados.variations[0].condition == 'Alola'){
        tipos = dados.variations[0].types;
        pokemon = dados.variations[0].names.en;
        abil = dados.variations[0].abilities;
      }
      var gen = 'I'; if(dados.national_id > 151) gen = 'II'; if(dados.national_id > 251) gen = 'III'; if(dados.national_id > 386) gen = 'IV'; if(dados.national_id > 493) gen = 'V'; if(dados.national_id > 649) gen = 'VI'; if(dados.national_id > 721) gen = 'VII';
      var height = dados.height_eu, weight = dados.weight_eu;
      if(forms){
        if(forms.indexOf('mega') > -1){
          if(forms.indexOf('y') > -1){
            tipos = dados.mega_evolutions[1].types;
            status = dados.mega_evolutions[1].base_stats;
            height = dados.mega_evolutions[1].height_eu;
            weight = dados.mega_evolutions[1].weight_eu;
          }else{
            tipos = dados.mega_evolutions[0].types;
            status = dados.mega_evolutions[0].base_stats;
            height = dados.mega_evolutions[0].height_eu;
            weight = dados.mega_evolutions[0].weight_eu;
          }
        }
      }
      var hp = status.hp, atk = status.atk, spatk = status.sp_atk, def = status.def, spdef = status.sp_def, spd = status.speed;
      var total = hp + atk + spatk + def + spdef + spd;
      var eggroups = !dados.egg_groups[1] ? dados.egg_groups[0] : dados.egg_groups[0] + ' / ' + dados.egg_groups[1];
      if(pokes.includes(dados.national_id.toString())) has = '/// You own this pokemon!';
      var abilities = abil.length > 1 ? abil[0].name + "/" + abil[1].name : abil[0].name;
      let embed = new Discord.RichEmbed()
      .setColor(colorObj[dados.color])
      .setImage(pokelink)
      .setAuthor(pokemon.replace("_"," ").toProperCase() + ' #' + dados.national_id,'https://media.discordapp.net/attachments/442412417377632276/479644475895971850/pokedex.png')
      .setDescription(dados.categories.en + ' ' + has)
      .addField("Abilities" , abilities,true)
      .addField("Color" , dados.color, true)
      .addField("Height" , height,true)
      .addField("Weight" , weight, true)
      .addField("Generation" , gen, true)
      .addField("Egg Groups" , eggroups, true)
      .setFooter(message.author.username, message.author.avatarURL)
      .addField("Base Stats", `Hp: ${hp} Atk: ${atk} Def: ${def} SpAtk: ${spatk} SpDef: ${spdef} Spd: ${spd} Total: ${total}`)
      .addField("Description", desc)
      //.addField("Evolution Line", evolutionLine)
      url(pokelink, function(err, exists) {
        if(exists != true) message.channel.send('Special form image not found!')
      })
      if(tipos.length > 1){
        var type1 = tipos[0].toLowerCase(), type2 = tipos[1].toLowerCase(), link = './images/types/' + type1 + type2 + '.png';
        embed.setThumbnail("attachment://type.png")
        if (fs.existsSync(link)) {
          message.channel.send({ embed, files: [{ attachment: ('./images/types/' + type1 + type2 + '.png'), name: 'type.png' }] });
        }else{
          message.channel.send({ embed, files: [{ attachment: ('./images/types/' + type2 + type1 + '.png'), name: 'type.png' }] });
        }
      }else{
        var typelink = "https://nintendowire.com/wp-content/themes/nintendoinq-v2.0/images/type-" + tipos[0].toLowerCase() + ".png";
        embed.setThumbnail(typelink);
        message.channel.send({embed});
      }
    }catch(error){
      console.log(error);
      let a = didyou(pokemon, bot.pokearray, 'name');
      if(a != null){
        const response = await bot.awaitReply(message, 'Did you mean ' + a + '?');
        if(response == 'yes' || response == 'sim') pksearch(a);
      }else{
        message.channel.send('Pokemon not found!');
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dex", "pkdex"],
  permLevel: "User"
};

exports.help = {
  name: "pokedex",
  category: "Pokémon",
  description: "Shows info about a pokemon",
  usage: "pokedex [pokemon] [special form]",
  example: "pokedex charizard* megax"
};