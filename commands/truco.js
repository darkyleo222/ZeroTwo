exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js');
  const merge = require('merge-img');
  let embed = new Discord.RichEmbed().setColor("#ff69b4").setTitle('TRUCO - Partida de ' + message.author.username).addField('Player 1', message.author.username);
  let cartas = [
    {name: 'Espadão',           value:13, img:'./images/truco/espadas/1.png'},
    {name: 'Pauzão',            value:12, img:'./images/truco/paus/1.png'},
    {name: 'Sete de Espadas',   value:11, img:'./images/truco/espadas/7.png'},
    {name: 'Sete de Ouros',     value:10, img:'./images/truco/copas/7.png'},
    {name: 'Três de Espadas',   value:9, img:'./images/truco/espadas/3.png'},
    {name: 'Três de Ouros',     value:9, img:'./images/truco/ouro/3.png'},
    {name: 'Três de Paus',      value:9, img:'./images/truco/paus/3.png'},
    {name: 'Três de Copos',     value:9, img:'./images/truco/copas/3.png'},
    {name: 'Dois de Espadas',   value:8, img:'./images/truco/espadas/2.png'},
    {name: 'Dois de Ouros',     value:8, img:'./images/truco/ouro/2.png'},
    {name: 'Dois de Paus',      value:8, img:'./images/truco/paus/2.png'},
    {name: 'Dois de Copos',     value:8, img:'./images/truco/copas/2.png'},
    {name: 'Copão',             value:7, img:'./images/truco/copas/1.png'},
    {name: 'Ourão',             value:7, img:'./images/truco/ouro/1.png'},
    {name: 'Doze de Espadas',   value:6, img:'./images/truco/espadas/12.png'},
    {name: 'Doze de Paus',      value:6, img:'./images/truco/paus/12.png'},
    {name: 'Doze de Ouros',     value:6, img:'./images/truco/ouro/12.png'},
    {name: 'Doze de Copos',     value:6, img:'./images/truco/copas/12.png'},
    {name: 'Onze de Espadas',   value:5, img:'./images/truco/espadas/11.png'},
    {name: 'Onze de Paus',      value:5, img:'./images/truco/paus/11.png'},
    {name: 'Onze de Ouros',     value:5, img:'./images/truco/ouro/11.png'},
    {name: 'Onze de Copos',     value:5, img:'./images/truco/copas/11.png'},
    {name: 'Dez de Espadas',    value:4, img:'./images/truco/espadas/10.png'},
    {name: 'Dez de Paus',       value:4, img:'./images/truco/paus/10.png'},
    {name: 'Dez de Ouros',      value:4, img:'./images/truco/ouro/10.png'},
    {name: 'Dez de Copos',      value:4, img:'./images/truco/copas/10.png'},
    {name: 'Sete de Paus',      value:3, img:'./images/truco/paus/7.png'},
    {name: 'Sete de Copos',     value:3, img:'./images/truco/copas/7.png'},
    {name: 'Seis de Espadas',   value:2, img:'./images/truco/espadas/6.png'},
    {name: 'Seis de Paus',      value:2, img:'./images/truco/paus/6.png'},
    {name: 'Seis de Copos',     value:2, img:'./images/truco/copas/6.png'},
    {name: 'Seis de Ouros',     value:2, img:'./images/truco/ouro/6.png'},
    {name: 'Cinco de Espadas',  value:1, img:'./images/truco/espadas/5.png'},
    {name: 'Cinco de Paus',     value:1, img:'./images/truco/paus/5.png'},
    {name: 'Cinco de Copos',    value:1, img:'./images/truco/copas/5.png'},
    {name: 'Cinco de Ouros',    value:1, img:'./images/truco/ouro/5.png'},
    {name: 'Quatro de Espadas', value:0, img:'./images/truco/espadas/4.png'},
    {name: 'Quatro de Paus',    value:0, img:'./images/truco/paus/4.png'},
    {name: 'Quatro de Copos',   value:0, img:'./images/truco/copas/4.png'},
    {name: 'Quatro de Ouros',   value:0, img:'./images/truco/ouro/4.png'}
  ]
  bot.shuffle(cartas);
  players = [];
  players.push(message.author.id)
  let playerhands = [cartas.slice(0,3), cartas.slice(4,7), cartas.slice(8,11), cartas.slice(12,15), cartas.slice(16,19), cartas.slice(20,23)];
  const response = await bot.awaitReply(message, 'Com quantas pessoas você gostaria de jogar? (*responda com 2,4 ou 6*)');
  if(response != '2' && response != '4' && response != '6') return message.reply('Esse número de jogadores não é valido!');
  embed.setDescription('Espaço para ' + (response - players.length) + ' jogadores')
  const m = await message.channel.send({embed});
  m.react('465964068382048259')
  collect = new Discord.ReactionCollector(m,(reaction, user) => reaction.emoji.id == '465964068382048259' && user.id != bot.user.id && !players.includes(user.id),{maxUsers:parseInt(response -1),time:30000});
  collect.on('collect', r =>{
    newplayer = r.users.last();
    players.push(newplayer.id)
    embed.setDescription('Espaço para ' + (response - players.length) + ' jogadores')
    .addField('Player ' + players.length, newplayer.username);
    m.edit(embed)
  })
  collect.on('end', async r =>{
    console.log(players);
    if (players.length < response) return message.channel.send('Número de pessoas para começar a partida inferior ao necessário. Truco cancelado!');
    for(x in players){
      await merge([playerhands[x][0].img, playerhands[x][1].img, playerhands[x][2].img]).then(async (img) => {
        await img.write('playerhand' + x + '.png', async () => { })
      });
      bot.users.get(players[x]).send({files: [{ attachment: ('./playerhand' + x + '.png'), name: 'playerhand.png' }]});
    }
  })
  //message.channel.send({files: [{ attachment: (cartas[escolha].img), name: 'carta.png' }]});
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "Adm"
};

exports.help = {
  name: "truco",
  category: "Minigames",
  description: "Starts a match of truco gauderio",
  usage: "truco",
  example: "truco"
};