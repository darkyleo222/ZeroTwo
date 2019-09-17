exports.run = async (bot, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args[0]) {
    var newamount = "2";
  }else{
    var amount = Number(args[0]);
    var adding = 1;
    var newamount = amount + adding;
  }
  let messagecount = newamount.toString();
  message.channel.fetchMessages({limit: messagecount})
  .then(messages => {
    message.channel.bulkDelete(messages);
    // Logging the number of messages deleted on both the channel and console.
    message.channel.send(newamount + " messages deleted including command!")
    .then(message => message.delete(2000));
    })
    .catch(err => {
      message.channel.send("Error while doing Bulk Delete " + err);
    })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["del","delete"],
  permLevel: "Adm"
};

exports.help = {
  name: "purge",
  category: "Miscelaneous",
  description: "Bulk delete messages",
  usage: "purge [number]",
  example: "purge 12"
};
