exports.run = async (bot, message, args, level) => {
  let type = args.shift()
      name = args.shift();
    var fs = require('fs');
    var filePath = 'commands/' + name + '.js'; 
    switch (type){
      case 'new':
        try{
          fs.createReadStream('commands/base.js').pipe(fs.createWriteStream(filePath));
          message.channel.send('Command ' + name + ' successfully created!')
        }catch (e){
          message.channel.send('Command ' + name + ' could not be created. ' + e)
        }
      break;
      case 'del':
        try{
          fs.unlinkSync(filePath);
          message.channel.send('Command ' + name + ' successfully deleted!')
        }catch (e){
            message.channel.send('Command ' + name + ' could not be deleted. ' + e)
        }
      break;
      case 'active':
        if (bot.commands.has(name)) {
          command = bot.commands.get(name);
        } else if (bot.aliases.has(name)) {
          command = bot.commands.get(bot.aliases.get(name));
        } else {
          message.channel.send("The command " + name + " does not exist!");
          return;
        }
        const props = require(`../commands/${name}`);
        if(props.conf.enabled == true){
          props.conf.enabled = false;
          value = "false";
          change = "true"
        } else{
          props.conf.enabled = true;
          value = "true";
          change = "false"
        }
        function readWriteSync() {
          var data = fs.readFileSync(filePath);
          var newValue = data.replace('enabled: ' + change, 'enabled: ' + value);
          fs.writeFileSync(filePath, newValue, 'utf-8');
          message.channel.send('Command ' + name + ' successfully changed!')
        }
        readWriteSync();
      break;
      case 'edit':
        let data = fs.readFileSync(filePath, 'utf-8');      
        let index = 0;
        while(index < data.length){
          var cleaner = data.substr(index,index + 1900);
          message.channel.send(`\`\`\`js\n${cleaner}\n\`\`\``);
          index = index + 1900;
        }
      break;
      case 'list':
        const { promisify } = require("util");
        const readdir = promisify(require("fs").readdir);
        const cmdFiles = await readdir("./commands/");
        p = "";
        message.channel.send(`Working with a total of ${cmdFiles.length} commands.`);
        cmdFiles.forEach(f => {
          if (!f.endsWith(".js")) return;
          p = p + "\n" + f;
        });
        message.channel.send(p);
      break;
      default:
      if(!name){
        message.channel.send("Please specify an action!");
      }else{
        message.channel.send("That's not a valid action!");
      }
    }  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "cmd",
  category: "Code",
  description: "Changes commands properties",
  usage: "cmd name [new/del/active/edit/list]",
  example: "cmd new example"
};