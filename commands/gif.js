exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js');
  const request = require('request');
  let search = encodeURIComponent(args.join(" "));
  let embed = new Discord.RichEmbed().setColor(message.member.displayColor);
  if (!search) return message.channel.send("You have to provide a search string!");
  link = 'https://api.tenor.com/v1/search?key=GTAMU1CL16Z4&media_filter=minimal&safesearch=off&q=' + search;

  function showGif(page, m) {
    link = resposta.results[page - 1].media[0].gif.url;
    embed.setURL(resposta.results[page - 1].url)
    embed.setTitle('Here\'s your gif!')
    embed.setDescription(page + '/20')
    embed.setImage(link);
    m.edit({embed});
    m.react('⬅').then(() => m.react('➡').then(() => m.react('❌').then(() => m.react('🔢'))));
    m.awaitReactions((reaction, user) => user.id === message.author.id, {
      max: 1,
      time: 30000
    }).then(async reactions => {
      if (reactions.first() == undefined) return;
      if (reactions.first().emoji.name == '➡') {
        reactions.first().remove(message.author).then(() => showGif(page + 1, m))
      }else if(reactions.first().emoji.name == '⬅'){
        if(page == 1){
          message.reply(':no_entry_sign: You can\'t go back a page if you\'re on page 1!').then(message => message.delete(2000));
          showGif(1, m);
        }else{
          reactions.first().remove(message.author).then(() => showGif(page - 1, m))
        }
      }else if(reactions.first().emoji.name == '❌') {
        return m.edit("Session ended!");
      }
      else if(reactions.first().emoji.name == '🔢') {
        const response = await bot.awaitReply(message, 'Which page?');
        if(response > 0 && response < 21 ){
          reactions.first().remove(message.author).then(() => showGif(parseInt(response), m))
        }else{
          reactions.first().remove(message.author).then(() => showGif(page, m))
          return message.reply('Invalid Page!').then(msg=> msg.delete(2000))
        }
      }
    }).catch(() => m.edit("Session ended!"));
  }

  request(link, async function (error, response, body) {
    try{
      resposta = JSON.parse(body);
      link = resposta.results[0].media[0].gif.url;
      embed.setURL(resposta.results[0].url)
      embed.setTitle('Here\'s your gif!')
      embed.setImage(link);
      embed.setDescription('1/20')
      const m = await message.channel.send({embed});
      m.react('⬅').then(() => m.react('➡').then(() => m.react('❌').then(() => m.react('🔢'))));
      m.awaitReactions((reaction, user) => user.id === message.author.id, {
        max: 1,
        time: 30000
      }).then(async reactions => {
        if (reactions.first() == undefined) return;
        if (reactions.first().emoji.name == '➡') {
          reactions.first().remove(message.author).then(() => showGif(2, m))
        } else if (reactions.first().emoji.name == '⬅') {
          message.reply(':no_entry_sign: You can\'t go back a page if you\'re on page 1!').then(message => message.delete(2000));
              showGif(1, m);
          } else if (reactions.first().emoji.name == '❌') {
          return m.edit("Session ended!");
        }else if(reactions.first().emoji.name == '🔢') {
          const response = await bot.awaitReply(message, 'Which page?');
          if(response > 0 && response < 21 ){
            reactions.first().remove(message.author).then(() => showGif(response, m));
          }else{
            reactions.first().remove(message.author).then(() => showGif(page, m))
            return message.reply('Invalid Page!').then(msg=> msg.delete(2000))
          }
        }
      }).catch(() => m.edit("Session ended!"));
    
    }catch(error){
      message.channel.send('Gif not found!');
      console.log(error)
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "gif",
  category: "Miscelaneous",
  description: "Sends a gif",
  usage: "gif [search]",
  example: "gif cats"
};