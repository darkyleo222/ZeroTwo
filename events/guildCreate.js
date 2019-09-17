module.exports = (bot, guild) => {
  bot.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) adicionou ZeroTwo. Dono: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  bot.sendLeo("I joined the guild " + guild.name + " " + guild.owner.user.tag)
};
