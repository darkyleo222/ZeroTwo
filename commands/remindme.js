exports.run = async (bot, message, args, level) => {
  let tempo = args.shift();
  let newReminder = args.join(" ");
  let reminds = bot.getReminds.all(message.author.id);
  
  if(!newReminder){
    if(!reminds) return message.reply("You don't have any reminder set!");
    let output = "*" + message.author.username + "\'s Reminders:* \n";
    for(x in reminds){
      date = new Date(reminds[x].conclusionTime);
      date = date.toString();
      date = date.substr(0,date.lastIndexOf(":"))
      output += `\`${date}:\` ${reminds[x].remind} \n` 
    }
    return message.channel.send(output);
  }
  let now = new Date();
  now = now.getTime();
  horas = tempo.substr(0,tempo.indexOf(':'));
  minutos = tempo.substr(tempo.indexOf(':') + 1, tempo.length);
  if(horas/1 != horas || minutos/1 != minutos || !horas || !minutos || tempo.indexOf(':') == -1) return message.reply("Incorret time format!")
  tempoSet = (horas * 60 * 60 * 1000) + (minutos * 60 * 1000);
  setTimeout(() => {
    message.author.send("You asked me to remind you this: " + newReminder);
    bot.sql("DELETE FROM reminds WHERE remind = '" + newReminder + "'")
  }, tempoSet)
  rem = {name:message.author.username,id:message.author.id,remind:newReminder, time:now, conclusionTime:(now + tempoSet)}
  message.reply("Reminder set!")
  bot.setReminds.run(rem);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "remindme",
  category: "Miscelaneous",
  description: "Sets a reminder, i'll warn you when the time expires",
  usage: "remindme [hh:mm] [text]",
  example: "remindme 4:00 go to work"
};