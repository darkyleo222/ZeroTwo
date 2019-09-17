exports.run = async (bot, message, args, level) => { // eslint-disable-line no-unused-vars
  if(!args[0]) args[0] = 'vazio';
  var person = bot.users.get(args[0]) || bot.users.find("username",args[0]) || message.mentions.users.first() || message.author;
  if(!person) return message.channel.send('User not found!');
  var pokes = bot.getPokemon.get(person.id);
  if (!pokes) return message.reply("You haven't caught any pokemon yet!");
  const Discord = require('discord.js');
  function reset(person){
    pokes = bot.getPokemon.get(person.id);
    toSend = pokes.pokemon.split(",").sort(function(a, b){return a-b});
    for(x in toSend){
      if(toSend[x].indexOf('✮') > -1){
        fix = (toSend[x].slice(toSend.indexOf('✮') + 2,toSend[x].length)) -1;
        space = '✮';
        toSend[x] = toSend[x].slice(toSend.indexOf('✮') + 1,toSend[x].length);
      }else{  
        fix = toSend[x] -1;
        space = '';
      }
      pokemote = bot.pokeball();
      pokename = bot.lendarray.includes(bot.pokenum[fix].names.en) ? ('*' + bot.pokenum[fix].names.en + '*') : bot.pokenum[fix].names.en
      if(bot.pokenum[fix].types.length > 1){
        let emote1 = bot.emojis.find("name", bot.pokenum[fix].types[0].toLowerCase()), emote2 = bot.emojis.find("name", bot.pokenum[fix].types[1].toLowerCase());
        toSend[x] += pokemote + pokename + space + " " + emote1 + emote2;
      }else{
        let emote1 = bot.emojis.find("name", bot.pokenum[fix].types[0].toLowerCase());
        toSend[x] += pokemote + pokename + space + " " + emote1;
      }
    }
  }

  reset(person);
  function showPage(page, m) { 
    reset(person);
    start = page == 1 ? 0 : ((page - 1) * 20);
    let stop = start + 20;
    m.edit(`**${person.username}'s Pokemon:** Includes **${toSend.length}/${bot.pokenum.length}** Pokemon. [Page ${page} (20 shown)] \n${toSend.slice(start, stop).join('\n')}`);
    m.awaitReactions((reaction, user) => user.id === message.author.id, {
      max: 1,
      time: 30000
    }).then(reactions => {
      if (reactions.first() == undefined) return;
      if (reactions.first().emoji.name == '➡') {
        reactions.first().remove(message.author).then(() => showPage(page + 1, m))        
      } else if (reactions.first().emoji.name == '⬅') {
        if (page == 1){
          message.reply(':no_entry_sign: You can\'t go back a page if you\'re on page 1!').then(message => message.delete(2000));
          showPage(1, m);
        }else {
          reactions.first().remove(message.author).then(() => showPage(page - 1, m))
        }
      }else if (reactions.first().emoji.name == '❌') {
        return m.edit('Pokemon inventory session ended.');
      }
    }).catch(() => m.edit('Pokemon inventory session ended.'));
  }

  const m = await message.channel.send(`**${person.username}'s Pokemon:** Includes **${toSend.length}/${bot.pokenum.length}** Pokemon. [Page 1] \n${toSend.slice(0, 20).join('\n')}`);
  m.react('⬅').then(() => m.react('➡').then(() => m.react('❌')));
  m.awaitReactions((reaction, user) => user.id === message.author.id, {
    max: 1,
    time: 30000
  }).then(reactions => {
    if (reactions.first() == undefined) return;
    if (reactions.first().emoji.name == '➡') {
      reactions.first().remove(message.author).then(() => showPage(2, m))
    } else if (reactions.first().emoji.name == '⬅') {
      message.reply(':no_entry_sign: You can\'t go back a page if you\'re on page 1!').then(message => message.delete(2000));
          //reset();
          reactions.first().remove(message.author).then(() => showPage(1, m))
      } else if (reactions.first().emoji.name == '❌') {
      return m.edit('Pokemon inventory session ended.');
    }
  }).catch(() => m.edit('Pokemon inventory session ended.'));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pkinv"],
  permLevel: "User"
};

exports.help = {
  name: "pokeinv",
  category: "Pokémon",
  description: "Shows the pokemons you own",
  usage: "pokeinv",
  example: "pokeinv"
};


