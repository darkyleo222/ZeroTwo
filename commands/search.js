exports.run = async (bot, message, args, level) => {
  const cheerio = require('cheerio'),
        snekfetch = require('snekfetch'),
        querystring = require('querystring');
  let text = args.join(" ");
  let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
  await snekfetch.get(searchUrl).then((result) => {
    resultado = [];
    title = [];
    let $ = cheerio.load(result.text);
    let a = $('.r');
    a.each(function (i, elem){
      resultado.push($(this).find('a').first().attr('href'))
      title.push($(this).find('a').text().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
      }
    )
  }).catch((err) => {
    m.edit('No results found!');
    console.log(err)
  });

  function showSearch(page, m) {
    link = querystring.parse(resultado[page - 1].replace('/url?', '')).q
    m.edit("Here is what I found!\n" + link);
    m.react('⬅').then(() => m.react('➡').then(() => m.react('❌')));
    m.awaitReactions((reaction, user) => user.id === message.author.id, {
      max: 1,
      time: 30000
    }).then(async reactions => {
      if (reactions.first() == undefined) return;
      if (reactions.first().emoji.name == '➡') {
        reactions.first().remove(message.author).then(() => showSearch(page + 1, m))
      }else if(reactions.first().emoji.name == '⬅'){
        if(page == 1){
          message.reply(':no_entry_sign: You can\'t go back a page if you\'re on page 1!').then(message => message.delete(2000));
          showSearch(1, m);
        }else{
          reactions.first().remove(message.author).then(() => showSearch(page - 1, m))
        }
      }else if(reactions.first().emoji.name == '❌') {
        return m.edit("Session ended!");
      }
    }).catch(() => m.edit("Session ended!"));
  }

  const m = await message.channel.send("Here is what I found!\n" + querystring.parse(resultado[0].replace('/url?', '')).q);
      m.react('⬅').then(() => m.react('➡').then(() => m.react('❌')));
      m.awaitReactions((reaction, user) => user.id === message.author.id, {
        max: 1,
        time: 30000
      }).then(async reactions => {
        if (reactions.first() == undefined) return;
        if (reactions.first().emoji.name == '➡') {
          reactions.first().remove(message.author).then(() => showSearch(2, m))
        } else if (reactions.first().emoji.name == '⬅') {
          message.reply(':no_entry_sign: You can\'t go back a page if you\'re on page 1!').then(message => message.delete(2000));
              showSearch(1, m);
          } else if (reactions.first().emoji.name == '❌') {
          return m.edit("Session ended!");
          }
      }).catch(() => m.edit("Session ended!"));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "search",
  category: "Miscelaneous",
  description: "Search things on Google",
  usage: "search [.. things to search]",
  example: "search dog images"
};