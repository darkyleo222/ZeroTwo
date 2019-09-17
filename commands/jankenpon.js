exports.run = async (bot, message, args, level) => {
  const Discord = require('discord.js')
  let player1 = message.member;
  let player2 = message.mentions.members.first();
  if(!player2 || player2 == player1 || player2.user.bot == true) return message.channel.send('You must challenge another person!');
  const sended = message.channel.send('**' + player1.user.username + '** challenged **' + player2.user.username + '** to a Jankenpon Duel! Who shall win? Check your dms!');
  let victory = new Discord.RichEmbed().addField('YOU WON!! :D', '\u200b').setColor('#01ff45').setFooter(player1.user.username + ' vs ' + player2.user.username)
  let lose = new Discord.RichEmbed().addField('Sorry, you\'ve lost :(', '\u200b').setColor('#ff0101').setFooter(player1.user.username + ' vs ' + player2.user.username);
  let draw = new Discord.RichEmbed().addField('It ended up in a draw!', '\u200b').setColor('#FFFFFF').setFooter(player1.user.username + ' vs ' + player2.user.username);
  let embed = new Discord.RichEmbed().setTitle(player1.user.username + ' vs ' + player2.user.username).addField('\u200b', 'React with :scissors: for scissors, :newspaper: for paper and :full_moon: for rock!').setColor('255,0,255')
  const m1 = await player1.send({embed});
  const m2 = await player2.send({embed});
  let symbols = ["scissors", "paper", "rock"];
  m1.react('✂').then(() => m1.react('📰').then(() => m1.react('🌕')));

  const result1 = await m1.awaitReactions((reaction, user) => user.id === player1.user.id, {
    max: 1,
    time: 60000
  }).then(reactions => {
    m2.react('✂').then(() => m2.react('📰').then(() => m2.react('🌕')));
    let result1 = 'a';
    if(reactions.first().emoji.name == '✂'){
      return 0;
    }else if(reactions.first().emoji.name == '📰') {
      return 1;
    }else if(reactions.first().emoji.name == '🌕'){
      return 2;
    }
    if (reactions.first() == undefined) return;
  }).catch(err => console.log(err));

  const result2 = await m2.awaitReactions((reaction, user) => user.id === player2.user.id, {
    max: 1,
    time: 60000
  }).then(reactions2 => {
    let result2 = 'b';
    if(reactions2.first().emoji.name == '✂'){
      return 0;
    }else if(reactions2.first().emoji.name == '📰') {
      return 1;
    }else if(reactions2.first().emoji.name == '🌕'){
      return 2;
    }
    if (reactions2.first() == undefined) return;
  }).catch(err => console.log(err));
  
  const resultado = await Promise.all([result1, result2]).then(() => {
    if(result1 == result2){
      sended.edit(`**${player1.user.username}** and **${player2.user.username}** played ${symbols[result1]} and the game ended in a draw.`);
      m1.edit(draw);
      m2.edit(draw);
    }
    if((result2 - result1 + 3) % 3 == 1){
      sended.edit(`**${player1.user.username}** played **${symbols[result1]}** and won against ${player2.user.username}\'s ${symbols[result2]}.`);
      m1.edit(victory);
      m2.edit(lose);
    }
    if((result1 - result2 + 3) % 3 == 1){
      sended.edit(`**${player2.user.username}** played **${symbols[result2]}** and won against ${player1.user.username}\'s ${symbols[result1]}.`);
      m1.edit(lose);
      m2.edit(victory);
    }  

  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["jkp"],
  permLevel: "User"
};

exports.help = {
  name: "jankenpon",
  category: "Minigames",
  description: "Plays jankenpon against another player",
  usage: "jankenpon @[player]",
  example: "jankenpon @leo"
};