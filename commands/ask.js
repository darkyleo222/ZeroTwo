exports.run = async (bot, message, args, level) => {
  let language = args.shift();
  if(!language) return message.reply('Coloca alguma pergunta ai rapaz')
	const replyeng = ["Yes", "No", "How silly of you to think so",
		"What an absurd question! Of course not", "Never", "Yep", "Of course not!",
		"Signs point to yes", "Don't count on it", "You may rely on it", "Very doubtful",
		"It is certain", "Without a doubt", "Don't count on it", "Only a baffoon would say yes",
		"It is within reason", "REEEEEEEE", "Does 2 + 2 = 4? Yeah I thought so", "Yes, if the sun is shining today",
		"My Magic 8-Ball says yes", "Don't bother me with such trivial questions", "Ask someone who cares",
		"Google it", "Affirmative", "After intense scientific research, I can confirm it is true",
		"Sounds like a conspiracy theory to me", "Never in a million years", "I shiver to think about it",
		"Please don't make me answer that", "Impossibru", "Only if the world ends tomorrow",
    "Not a chance", "There is a very small chance"];
  const reply = ["Sim", "Não", "Que bobo da sua parte pensar assim",
  "Que pergunta absurda! Claro que não", "Nunca", "Sim", "Claro que não!",
  "Sinais apontam para sim", "Não conte com isso", "Mas é claro!", "Muito duvidoso",
  "É certo", "Sem dúvida", "Não conte com isso", "Apenas um idiota diria sim",
  "Que pergunta é essa rapaz? vai tomar no seu cu", "REEEEEEEE", "Tão certo como 2+2 = 4", "Sim, se o sol está brilhando hoje",
  "Minha bola de cristal diz sim", "Não me incomode com perguntas tão triviais", "Pergunte a alguém que se importa",
  "Joga no Google", "Afirmativo", "Depois de intensa pesquisa científica, posso confirmar que é verdade",
  "Soa como uma teoria da conspiração para mim", "Nunca em um milhão de anos", "Eu tenho medo de pensar sobre isso",
  "Por favor, não me faça responder isso", "Impossibru", "Só se o mundo acabar amanhã",
  "Não há uma chance", "Há uma chance muito pequena"];

  // Get random string from array
  result = message.guild.region == 'brazil' ? reply[Math.floor(Math.random() * reply.length)] + "!" : replyeng[Math.floor(Math.random() * replyeng.length)] + "!";
	message.channel.send(result);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ask",
  category: "Minigames",
  description: "Ask me a question!",
  usage: "ask [question]",
  example: "ask are you gay?"
};