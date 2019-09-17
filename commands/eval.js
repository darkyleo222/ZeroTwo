exports.run = async (bot, message, args, level) => {
  const code = args.join(" ");
  try {
    var evaled = eval(code);
    const clean = await bot.clean(bot, evaled);
    let index = 0;
    while(index < clean.length){
      var cleaner = clean.substr(index,index + 1900);
      message.channel.send(`\`\`\`js\n${cleaner}\n\`\`\``);
      index = index + 1900;
    }
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await bot.clean(bot, err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "eval",
  category: "Code",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]",
  example: "eval 2+2"
};