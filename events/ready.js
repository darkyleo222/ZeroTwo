module.exports = async bot => {
  bot.logger.log(`[READY] ${bot.user.tag}, pronta para ${bot.users.size} usuários em ${bot.guilds.size} servers.`, "ready");
  bot.user.setActivity(`over ${bot.users.size} people || ,help`, {type: "WATCHING"});
  //bot.sendLeo("Hai hai, i'm up again :3");
};
