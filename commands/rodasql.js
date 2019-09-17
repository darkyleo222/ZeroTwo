exports.run = async (bot, message, args, level) => {
  message.reply("wait..");
  var pokemon = {};
  for(x in bot.pokenum){
    pokemon.national_id = bot.pokenum[x].national_id;
    pokemon.name = bot.pokenum[x].names.en;
    pokemon.type1 = bot.pokenum[x].types[0];
    pokemon.type2 = !bot.pokenum[x].types[1] ? '' : bot.pokenum[x].types[1]
    pokemon.ability1 = bot.pokenum[x].abilities[0].name;
    pokemon.ability2 = !bot.pokenum[x].abilities[1] ? '' : bot.pokenum[x].abilities[1].name;
    pokemon.ability3 = !bot.pokenum[x].abilities[2] ? '' : bot.pokenum[x].abilities[2].name;
    pokemon.genderm = !bot.pokenum[x].gender_ratios ? '' : bot.pokenum[x].gender_ratios.male;
    pokemon.genderf = !bot.pokenum[x].gender_ratios ? '' : bot.pokenum[x].gender_ratios.female;
    pokemon.catch_rate = bot.pokenum[x].catch_rate;
    pokemon.egg_groups1 = bot.pokenum[x].egg_groups[0];
    pokemon.egg_groups2 = !bot.pokenum[x].egg_groups[1] ? '' : bot.pokenum[x].egg_groups[1];
    pokemon.hatch_time = bot.pokenum[x].hatch_time[0];
    pokemon.heigth_us = bot.pokenum[x].heigth_us;
    pokemon.height_eu = bot.pokenum[x].height_eu;
    pokemon.weight_us = bot.pokenum[x].weight_us;
    pokemon.weight_eu = bot.pokenum[x].weight_eu;
    pokemon.leveling_rate = bot.pokenum[x].leveling_rate;
    pokemon.ev_hp = bot.pokenum[x].ev_yield.hp;
    pokemon.ev_atk = bot.pokenum[x].ev_yield.atk;
    pokemon.ev_def = bot.pokenum[x].ev_yield.def;
    pokemon.ev_spatk = bot.pokenum[x].ev_yield.sp_atk;
    pokemon.ev_spdef = bot.pokenum[x].ev_yield.sp_def;
    pokemon.ev_speed = bot.pokenum[x].ev_yield.speed;
    pokemon.color = bot.pokenum[x].color;
    pokemon.base_friendship = bot.pokenum[x].base_friendship;
    pokemon.stats_hp = bot.pokenum[x].base_stats.hp;
    pokemon.stats_atk = bot.pokenum[x].base_stats.atk;
    pokemon.stats_def = bot.pokenum[x].base_stats.def;
    pokemon.stats_spatk = bot.pokenum[x].base_stats.sp_atk;
    pokemon.stats_spdef = bot.pokenum[x].base_stats.sp_def;
    pokemon.stats_speed = bot.pokenum[x].base_stats.speed;
    pokemon.evolutions = JSON.stringify(bot.pokenum[x].evolutions);
    pokemon.evolvefrom = bot.pokenum[x].evolution_from;
    pokemon.desc = bot.pokenum[x].categories.en;
    pokemon.kanto_id = bot.pokenum[x].kanto_id;
    pokemon.johto_id = bot.pokenum[x].johto_id;
    pokemon.hoenn_id = bot.pokenum[x].hoenn_id;
    pokemon.sinnoh_id = bot.pokenum[x].sinnoh_id;
    pokemon.unova_id = bot.pokenum[x].unova_id;
    pokemon.kalos_id = bot.pokenum[x].kalos_id;
    pokemon.alola_id = bot.pokenum[x].alola_id 
    pokemon.ultra_alola_id = !bot.pokenum[x].ultra_alola_id ? 'null' : bot.pokenum[x].ultra_alola_id;
    pokemon.mega_evo = JSON.stringify(bot.pokenum[x].mega_evolutions);
    pokemon.variations = JSON.stringify(bot.pokenum[x].variations);
    pokemon.pokedex = JSON.stringify(bot.pokenum[x].pokedex_entries);
    pokemon.moves = JSON.stringify(bot.pokenum[x].move_learnsets);
    bot.runPokesql.run(pokemon);
    console.log(pokemon.name)
  }
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "Leo"
};

exports.help = {
  name: "rodasql",
  category: "Code",
  description: "base",
  usage: "base",
  example: "base"
};