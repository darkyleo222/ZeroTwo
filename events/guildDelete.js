module.exports = (bot, guild) => {
  bot.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}) removeu ZeroTwo.`);

  if (bot.settings.has(guild.id)) {
    bot.settings.delete(guild.id);
  }
};
