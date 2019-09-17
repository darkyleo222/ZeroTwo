exports.run = async (bot, message, args, level) => {// eslint-disable-line no-unused-vars
  await message.reply("I'm being restarted.");
  bot.commands.forEach( async cmd => {
    await bot.unloadCommand(cmd);
  });
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "restart",
  category: "System",
  description: "Restarts ZeroTwo.",
  usage: "restart",
  example: "restart"
};
