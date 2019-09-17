exports.run = async (bot, message, args, level) => {
    message.delete();
    emote = new String();
    emote = args[0];
    tratemote = emote.replace("<", "").replace(">", "");
    emojiId = tratemote.substring(tratemote.lastIndexOf(':') + 1,tratemote.length);
    thumb = emote[1] == "a" ? "https://cdn.discordapp.com/emojis/" + emojiId + ".gif" : "https://cdn.discordapp.com/emojis/" + emojiId + ".png";
    message.channel.send("*" + message.author.username + " says*:",{files: [thumb]});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "jmote",
  category: "Miscelaneous",
  description: "Sends a big emote",
  usage: "jmote [emote]",
  example: "jmote :lol:"
};