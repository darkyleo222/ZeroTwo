exports.run = async (bot, message, args, level) => {
  const request = require('request');
  const Discord = require('discord.js')
  let place = encodeURIComponent(args.join(" ").toLowerCase());
  let embed = new Discord.RichEmbed();
  if (!place) place = "london";
  link = 'http://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=c1fab794742fd5469b72b0af07725a1e&units=metric';
  request(link, function (error, response, body) {
    try{
      resposta = JSON.parse(body);
      temperatura = resposta.main.temp;
      embed.setAuthor(resposta.name, "attachment://flag.png" )
      embed.setThumbnail()
      embed.addField(`The temperature is ${temperatura}°C`, `*Min: ${resposta.main.temp_min}°C Max: ${resposta.main.temp_max}°C*`);
      embed.setColor("#ff69b4");
      embed.setFooter(resposta.weather[0].description.toProperCase() + ' / Wind Speed: ' + (resposta.wind.speed * 3.6).toFixed(2) + ' km/h',"http://openweathermap.org/img/w/" + resposta.weather[0].icon + ".png"); 
      message.channel.send({embed, files: [{ attachment: './images/flags/' + resposta.sys.country.toLowerCase() + '.png', name: 'flag.png' }]})
    }catch(error){
      message.channel.send('Location not found!');
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["temp"],
  permLevel: "User"
};

exports.help = {
  name: "weather",
  category: "Miscelaneous",
  description: "Shows the weather of a certain place",
  usage: "weather [place]",
  example: "weather sao paulo"
};