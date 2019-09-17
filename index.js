const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require('fs');
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const bot = new Discord.Client();

bot.pokearray = [];
bot.lendarray = [];
bot.pokenum = [];

bot.config = require("./config.js");
bot.logger = require("./util/Logger");

require("./modules/functions.js")(bot);
require("./modules/database.js")(bot);
require("./modules/extramsg.js")(bot);

bot.commands = new Enmap();
bot.aliases = new Enmap();
bot.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  bot.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = bot.loadCommand(f);
    if (response) console.log(response);
  });

  const pkFiles = await readdir("./pokemon/");
  pkFiles.forEach(f => {
    if (!f.endsWith(".json")) return;
    bot.pokenum.push(JSON.parse(fs.readFileSync("./pokemon/" + f)));
    bot.pokearray.push(JSON.parse(fs.readFileSync("./pokemon/" + f)));
  });

  for (x in bot.pokearray){
    if(bot.pokearray[x].egg_groups[0] == 'Undiscovered' && bot.pokearray[x].catch_rate < 100 && !bot.pokearray[x].evolutions[0]){
      bot.lendarray.push(bot.pokearray[x].names.en);
    }
  }

  for (x in bot.pokearray){
    bot.pokearray[x].name = bot.pokearray[x].names.en;
  }

  bot.pokenum = bot.pokenum.sort(function (a,b){return a.national_id - b.national_id});

  const evtFiles = await readdir("./events/");
  bot.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);

    bot.on(eventName, event.bind(null, bot));
    const mod = require.cache[require.resolve(`./events/${file}`)];
    delete require.cache[require.resolve(`./events/${file}`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
  });

  bot.levelCache = {};
  for (let i = 0; i < bot.config.permLevels.length; i++) {
    const thisLevel = bot.config.permLevels[i];
    bot.levelCache[thisLevel.name] = thisLevel.level;
  }

  bot.on('error', console.error);
  bot.login(bot.config.token);
};

init();
