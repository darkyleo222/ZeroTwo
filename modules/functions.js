module.exports = (bot) => {

  bot.permlevel = message => {
    let permlvl = 0;

    const permOrder = bot.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  bot.getGuildSettings = (guild) => {
    const def = bot.config.defaultSettings;
    if (!guild) return def;
    const returns = {};
    const overrides = bot.settings.get(guild.id) || {};
    for (const key in def) {
      returns[key] = overrides[key] || def[key];
    }
    return returns;
  };
  
  bot.link = new Set();

  bot.awaitReply = async (message, question, limit = 5000) => {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send(question);
    try {
      const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  bot.getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  bot.pokeball = () =>{
    random = bot.getRandom(0,3);
    switch(random){
      case 0:
        pokemote = bot.emojis.get('400762915453665288');
      break;
      case 1:
        pokemote = bot.emojis.get('400762915617243147');
      break;
      case 2:
        pokemote = bot.emojis.get('400762915893805081');
      break;
      case 3:
        pokemote = bot.emojis.get('400762917429182464');
      break;
    }
    return pokemote;
  } 
  
  bot.clean = async (bot, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(bot.token, "NDYxMTQ4OTc4MjI3MDUyNTU0.DhPW2g.ePkaYG2oUh10JkOWdzdbwAgHPlY");

    return text;
  };
  
  bot.sendLeo = text => {
    bot.users.get("272019229073604609").send(text);
  };

  bot.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      bot.logger.log(`Loading Command: ${props.help.name}.`);
      if (props.init) {
        props.init(bot);
      }
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  bot.searchObj = (obj, query) => {
    for (var key in obj) {
      var value = key;
      if (typeof value === 'object') {
          searchObj(value, query);
      }
      if (value === query) {
          return(obj[key]);
      }
    }
  }

  bot.shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  bot.unloadCommand = async (commandName) => {
    let command;
    if (bot.commands.has(commandName)) {
      command = bot.commands.get(commandName);
    } else if (bot.aliases.has(commandName)) {
      command = bot.commands.get(bot.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(bot);
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };    

  bot.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    bot.logger.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    bot.logger.error(`Unhandled rejection: ${err}`);
  });
};
