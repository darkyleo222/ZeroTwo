const config = {
  "ownerID": "272019229073604609",
  "admins": [],
  "support": [],
  "token": "NDYxMTQ4OTc4MjI3MDUyNTU0.DkvTgg.U8Sn8vV85tfytj6_60ovYiOT-iw",
  "defaultSettings" : {
    "prefix": ",",
    "modLogChannel": "mod-log",
    "modRole": "Moderador",
    "adminRole": "Admin",
    "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
    "welcomeChannel": "welcome",
    "welcomeMessage": "Say hello to {{user}}, everyone!",
    "welcomeEnabled": "false",
    "starboard": "general",
    "staremote": "🔥"
  },

  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },
    { level: 2,
      name: "Mod",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    { level: 3,
      name: "Adm", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: "Srv", 
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
    { level: 8,
      name: "Sup",
      check: (message) => config.support.includes(message.author.id)
    },
    { level: 9,
      name: "Bot",
      check: (message) => config.admins.includes(message.author.id)
    },
    { level: 10,
      name: "Leo", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
