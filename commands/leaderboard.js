exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js');
  let moniboard = JSON.parse(bot.sql('SELECT name, money FROM data ORDER BY money DESC LIMIT 10'));
  let pkboard = JSON.parse(bot.sql('SELECT name, pokemon FROM pokemonData'));
  let embed = new Discord.RichEmbed().setColor("#ff69b4");
  let list = [];
  for (x in pkboard){
    list[x] = {name: pkboard[x].name, pkmon: pkboard[x].pokemon.split(',').length};
  }
  list.sort(function(a, b) { return b.pkmon - a.pkmon;});
  let i = 1, moniput = '', pokeput = '';
  for(x in moniboard){
    pokemote = '<:pokeball:400762915617243147>';
    if(i == 1) pokemote = '<:pokmasterball:400762917429182464>';
    if(i == 2) pokemote = '<:pokultraball:400762915893805081>';
    if(i == 3) pokemote = '<:pokgreatball:400762915453665288>';

    moniput += `${i}°: ${moniboard[x].money}<:allescoin:476710067639681030> *${moniboard[x].name}* \n`
    pokeput += `${i}°: ${list[x].pkmon}${pokemote}*${list[x].name}* \n`
    i++;
  }
  embed.addField('Top 10 AllesCoin Businessman    \u200b\u200b',moniput, true);
  embed.addField('Top 10 Pokemon Catchers',pokeput, true);
  embed.setFooter(message.author.username, message.author.avatarURL);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["lb"],
  permLevel: "User"
};

exports.help = {
  name: "leaderboard",
  category: "Minigames",
  description: "Shows the top 10 pokemon catchers and top 10 richer players",
  usage: "leaderboard",
  example: "leaderboard"
};