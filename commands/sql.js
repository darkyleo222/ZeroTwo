exports.run = async (bot, message, args, level) => {
  var text = args.join(" ");
  var sqld = bot.sql(text);
  const clean = await bot.clean(bot, sqld);
  message.channel.send(`\`\`\`js\n${sqld}\n\`\`\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "sql",
  category: "System",
  description: "Runs Sqlite commands",
  usage: "sql [...code]",
  example: "sql SELECT * FROM data"
};