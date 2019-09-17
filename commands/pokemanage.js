exports.run = async (bot, message, args, level) => {
  let tipo = args.shift();
  let pokemon = args.shift();
  let user = message.mentions.members.first() || bot.guilds.get(message.guild.id).members.get(args.shift()) || message.member;
  let pokes = bot.getPokemon.get(user.id);
  switch(tipo){
    case 'add':
      pokes.pokemon += ',' + pokemon;
      message.channel.send('Pokemon ' + bot.pokenum[pokemon - 1].names.en + ' successfully added to user ' + user.user.username +'!')
    break;
    case 'rmv':
      let pokearray = pokes.pokemon.split(',');
      pokearray.splice(pokearray.indexOf(pokemon), 1);
      pokes.pokemon = pokearray.join(',');
      message.channel.send('Pokemon ' + bot.pokenum[pokemon - 1].names.en + ' successfully removed from user ' + user.user.username +'!')
    break;
    case 'reset':
      pokes.pokemon = ''; pokes.time = 0;
      message.channel.send('Pokemon Inventory cleared on user ' + user.user.username +'!')
    break;
    default:
      return message.channel.send('That\'s not a valid pokemanage argument!');
  }
  bot.setPokemon.run(pokes);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pkmng"],
  permLevel: "Leo"
};

exports.help = {
  name: "pokemanage",
  category: "Pokémon",
  description: "Manages things about Pokémon",
  usage: "pokemanage [add/rmv/reset] [pokemonid] [id or mention]",
  example: "pokemanage add 151 0123456789101"
};