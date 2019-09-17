module.exports = (bot) => {
  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./db/data.sqlite');
  bot.getData = sql.prepare("SELECT * FROM data WHERE user = ?");
  bot.setData = sql.prepare("INSERT OR REPLACE INTO data (id, user, money, name, betcount, topbet) VALUES (@id, @user, @money, @name, @betcount, @topbet);");
  bot.setSuggestion = sql.prepare("INSERT INTO suggestions (user, suggestion) VALUES (@user, @suggestion)")
  bot.getSuggestion = sql.prepare("SELECT * FROM suggestions")
  bot.getPokemon = sql.prepare("SELECT * FROM pokemonData WHERE user = ?");
  bot.setPokemon = sql.prepare("INSERT OR REPLACE INTO pokemonData (id, user, pokemon, time, name, pkcount, trainer, pkalert) VALUES (@id, @user, @pokemon, @time, @name, @pkcount, @trainer, @pkalert);");
  //bot.runPokesql = sql.prepare("INSERT INTO pokemon (national_id,name,type1,type2,ability1,ability2,ability3,genderm,genderf,catch_rate,egg_groups1,egg_groups2,hatch_time,heigth_us,height_eu,weight_us,weight_eu,leveling_rate,ev_hp,ev_atk,ev_def,ev_spatk,ev_spdef,ev_speed,color,base_friendship,stats_hp,stats_atk,stats_def,stats_spatk,stats_spdef,stats_speed,evolutions,evolvefrom,kanto_id,johto_id,hoenn_id,sinnoh_id,unova_id,kalos_id,alola_id,ultra_alola_id,mega_evo,variations,pokedex,moves) VALUES(@national_id,@name,@type1,@type2,@ability1,@ability2,@ability3,@genderm,@genderf,@catch_rate,@egg_groups1,@egg_groups2,@hatch_time,@heigth_us,@height_eu,@weight_us,@weight_eu,@leveling_rate,@ev_hp,@ev_atk,@ev_def,@ev_spatk,@ev_spdef,@ev_speed,@color,@base_friendship,@stats_hp,@stats_atk,@stats_def,@stats_spatk,@stats_spdef,@stats_speed,@evolutions,@evolvefrom,@kanto_id,@johto_id,@hoenn_id,@sinnoh_id,@unova_id,@kalos_id,@alola_id,@ultra_alola_id,@mega_evo,@variations,@pokedex,@moves)");
  bot.setReminds = sql.prepare("INSERT INTO reminds (name, id, remind, time, conclusionTime) VALUES (@name, @id, @remind, @time, @conclusionTime )");
  bot.getReminds = sql.prepare("SELECT * FROM reminds WHERE id = ?")
  bot.sql = text => {
    try{
        if(text.startsWith('SELECT')){
          var sqld = JSON.stringify(sql.prepare(text).all(), null, 4);
        }else{
          var sqld = JSON.stringify(sql.prepare(text).run(), null, 4);
        }
        return sqld;
    }catch(error){
        return error;
    }
  }
}
