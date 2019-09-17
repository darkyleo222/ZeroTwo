module.exports = (bot, message) => {
  if (message.author.bot) return;
  if(message.author.id == bot.config.ownerID && message.channel.type == 'dm' && bot.link.size > 0){
    bot.link.forEach(chan =>{
      bot.channels.get(chan).send(message.content);
    })
  }
  const settings = message.settings = bot.getGuildSettings(message.guild);
  bot.lockMessage(message);
  if(!message.isMentioned(bot.user) && !message.content.startsWith(settings.prefix)) return;
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const level = bot.permlevel(message);
  
  var data = bot.getData.get(message.author.id);
  if (!data) {
    data = { id: message.author.id, user: message.author.id, money: 0, name: message.author.username, betcount: 0, topbet: 0 }
  }
  data.name = message.author.username;
  bot.setData.run(data);
  
  const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
  if (!cmd) return;
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < bot.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
      Your permission level is ${level} (${bot.config.permLevels.find(l => l.level === level).name})
      This command requires level ${bot.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }
  
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  cmd.run(bot, message, args, level);
  if(message.channel.type == 'dm'){
    bot.logger.cmd(`[CMD] ${bot.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name} on dms`)
  }else{
    bot.logger.cmd(`[CMD] ${bot.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name} on ${message.channel.name} [${message.guild.name}]`);
  }
};
