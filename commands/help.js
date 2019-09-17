exports.run = (bot, message, args, level) => {
  const Discord = require('discord.js');
  if (!args[0]) {
    const myCommands = message.guild ? bot.commands.filter(cmd => bot.levelCache[cmd.conf.permLevel] <= level) : bot.commands.filter(cmd => bot.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let embed = new Discord.RichEmbed().setColor("#ff69b4").setTitle('Zero Two Command List')
    //let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for detail]\n`;
    let output = `\n[Use ${message.settings.prefix}help <commandname> for detail]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== **${cat}** ==\n`;
        currentCategory = cat;
      }
      if (c.conf.enabled == false) return;
      output += `\`${message.settings.prefix}${c.help.name}\`${" ".repeat(longest - c.help.name.length)}: ${c.help.description}\n`;
    });
    embed.setDescription(output);
    //message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
    message.channel.send({embed});
  } else {
    let command = args[0];
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      if (level < bot.levelCache[command.conf.permLevel]) return;
      if (command.conf.enabled == false) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\nexample:: ${command.help.example}\n= ${command.help.name} =`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Shows help.",
  usage: "help [command]",
  example: "help eval"
};
