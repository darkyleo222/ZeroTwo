module.exports = (bot) => {
  const Discord = require('discord.js');
  bot.lockMessage = message => {
    if(message.channel.type == 'dm') return;
    const settings = bot.getGuildSettings(message.guild);
    if(message.guild.id != '304750497066385408'){
      return;
    }
    if (message.channel.id == '430415996709240833' && !message.content.startsWith('!b')) {
        message.delete();
        return;
    }
    if (message.channel.id == '430416347915091988' && (!message.content.startsWith('http') || message.content.indexOf('youtube') < 1)) {
        message.delete();
        return;
    }
    if (message.channel.id == '430415509360738305' && !message.content.startsWith('http')) {
        message.delete();
        return;
    }
    if (message.channel.id == '430416494648623124' && !message.content.startsWith('.rule34')) {
        message.delete();
        return;
    }
    if (message.channel.id == '430416494648623124' && !message.content.startsWith('.hentaibomb')) {
        message.delete();
        return;
    }
    
    
  }

}
