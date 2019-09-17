exports.run = async (bot, message, args, level) => {
  const ytdl = require('ytdl-core');
  const opus = require('opusscript');
  const cheerio = require('cheerio'),
        snekfetch = require('snekfetch'),
        querystring = require('querystring'),
        Discord = require('discord.js');
  let options = args.shift();
  let ytbsong = args.join(" ");
  let queue = [];
  const { voiceChannel } = message.member;
  if (!voiceChannel) return message.reply('You have to be in a voice channel to use this command!')
  
  async function search(text) {
    let searchUrl = `https://www.google.com/search?q=youtube+${encodeURIComponent(text)}`;
    return snekfetch.get(searchUrl).then((result) => {
      let $ = cheerio.load(result.text);
      let a =  $('.r').first().find('a').first().attr('href');
      querystring.parse(a.replace('/url?', '')).q;
    }).catch((err) => {
      console.log(err)
      return message.channel.send('Youtube Video / Song not found!');
    });
  }   

  let link = await search(ytbsong);
  queue.push(link);
  console.log(link)
  function play(link) {
    console.log(link)
    if (!link) return voiceChannel.leave();
    const dispatcher = voiceChannel.connection.playStream(ytdl(link))
      .on('end', reason => {
        queue.shift();
        play(queue[0]);
      })
  }
  
  
    
  if(options == 'play'){
    var connection = await voiceChannel.join();
    play(queue[0]);
  }
  if(options == 'pause'){

  }
  if(options == 'skip'){

  }
  if(options == 'stop'){

  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "dj",
  category: "Music",
  description: "Plays Music",
  usage: "dj [play/pause/stop/skip]",
  example: "dj play faded"
};