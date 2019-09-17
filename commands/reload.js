exports.run = async (bot, message, args, level) => {// eslint-disable-line no-unused-vars
  if (!args || args.length < 1) return message.reply("Must provide a command to reload. Derp.");
  if(!bot.commands.get(args[0])) return message.reply("Command not found!")
  let response = await bot.unloadCommand(args[0]);
  if (response) return message.reply(`Error Unloading: ${response}`);
  response = bot.loadCommand(args[0]);
  if (response) return message.reply(`Error Loading: ${response}`);
  message.reply(`The command \`${args[0]}\` has been reloaded`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "reload",
  category: "Code",
  description: "Reloads a command that\'s been modified.",
  usage: "reload [command]",
  example: "reload eval"
};
