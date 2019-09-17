exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js')
  let embed = new Discord.RichEmbed().setTitle("Egg Groups").setColor(message.member.displayColor);
  let group = args.join(" ").toProperCase();
  let names = [];
  let pokelist = JSON.parse(bot.sql("SELECT * FROM pokemon WHERE national_id < 152"))
  for (x in pokelist){
    if(group == pokelist[x].egg_groups1) if(!names.includes(pokelist[x].name)){names.push(pokelist[x].name)}
    if(group == pokelist[x].egg_groups2) if(!names.includes(pokelist[x].name)){names.push(pokelist[x].name)}
  }
  if(names.length == 0){
    newgroup = JSON.parse(bot.sql("SELECT egg_groups1, egg_groups2 FROM pokemon WHERE name = '"+ group + "'"))
    grupo1 = newgroup[0].egg_groups1 == '' ? 'none' : newgroup[0].egg_groups1;
    grupo2 = newgroup[0].egg_groups2 == '' ? 'none' : newgroup[0].egg_groups2;
    for (x in pokelist){
      if(grupo1 == pokelist[x].egg_groups1 || grupo1 == pokelist[x].egg_groups2) if(!names.includes(pokelist[x].name)){names.push(pokelist[x].name)};
      if(grupo2 == pokelist[x].egg_groups2 || grupo2 == pokelist[x].egg_groups1) if(!names.includes(pokelist[x].name)){names.push(pokelist[x].name)};
    }
  }
  let output = '';
  for(x in names){
    if(x % 5 != 0 || x == 0){
      output += bot.emojis.find("name",names[x]) + names[x] + "  "
    }else{
      output += bot.emojis.find("name",names[x]) + names[x] + "\n"
    }
  }
  if(names.length == 0) return message.reply("Egg group / Pokémon not found!")
  embed.setDescription(output);
  message.channel.send({embed})
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ["egp"],
  permLevel: "User"
};

exports.help = {
  name: "eggroup",
  category: "Pokémon",
  description: "Filter Pokemons By Egg Group",
  usage: "eggroup [pokemon/egg group]",
  example: "eggroup water 1"
};