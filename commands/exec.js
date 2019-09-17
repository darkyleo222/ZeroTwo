exports.run = async (bot, message, args, level) => {
  let text = args.join(" "); 
  var exec = require('child_process').exec,
  child;
  child = exec(text,
    function (error, stdout, stderr) {
        if(stdout!==''){
           message.channel.send('---------stdout: ---------\n' + stdout);
        }
        if (error !== null) {
            message.channel.send('---------exec error: ---------\n[' + error+']');
        }
    });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "exec",
  category: "System",
  description: "Executes system commands on windows bash.",
  usage: "exec [...code]",
  example: "exec ping 127.0.0.1"
};