exports.run = async (bot, message, args, level) => {
  const app = require('node-server-screenshot');
  const url = require('url-exists')
  const Discord = require('discord.js');
  let embed = new Discord.RichEmbed();
  let site = args.shift();
  if(site.indexOf("http://") < 0 && site.indexOf("https://") < 0){
    site = 'http://' + site;
  }
  url(site, function(err, exists) {
    if(exists != true) return message.channel.send('Please inform a correct website!');
  })
  try{
    message.channel.send('Wait a few seconds...')
    app.fromURL(site, "site.png", function(){
      embed.setTitle(site);
      embed.setColor("#ff69b4");
      embed.setImage("attachment://site.png");
      message.channel.send({ embed, files: [{ attachment: ('site.png'), name: 'site.png' }] });
    });
  }catch(error){
    message.channel.send('Website not found!')
    console.log(error); 
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sc"],
  permLevel: "User"
};

exports.help = {
  name: "screenshot",
  category: "Miscelaneous",
  description: "Sends a screenshot of a site",
  usage: "screenshot [site]",
  example: "screenshot http://www.google.com"
};