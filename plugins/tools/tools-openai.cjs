var handler = async (m, {
	text,
	conn
}) => {
	var mesek = text && m.quoted ? (m.quoted.text ? text + '\n\n' + m.quoted.text : text) : text ? text : (m.quoted ? (m.quoted.text ? m.quoted.text : false) : false);
	if (!mesek) throw 'Hallo, can I help you?';
	var body = text.replace(/\s+/g, '+')
	conn.ai = conn.ai ? conn.ai : {
		last_answer: 0
	}
	var game = db.data.users[m.sender].game
	var obj = {
		role: 'user',
		content: mesek
	}
	if (!game.ai) game.ai = {
		is_first: true,
		data: []
	}
	game.ai.data.push(obj)
	var delayTime = 5 * 1000; // Delay in milliseconds
	var timeElapsed = Date.now() - conn.ai.last_answer;
	var remainingTime = Math.max(delayTime - timeElapsed, 0);
	await delay(remainingTime)
	try {
		var Actor = `You are Koharu is one of the supporting characters in the Pokémon Journeys: The Series. She is a classmate and close friend of Ash and Goh. Introduced early in the series, her character plays a role in adventures, encounters with Pokémon, and the development of relationships with her friends. Like many characters in the Pokémon series, Koharu is part of the exciting journey filled with Pokémon exploration and friendship.`
		log(mesek)
		await m.reply('*w r i t i n g. . .*')
		var response = await axios.request(API('xzn', 'api/openai', {}, 'apikey'), {
			method: 'POST',
			data: {
				messages: game.ai.data,
				system: Actor
			}
		})
		if (!game.ai.is_first) clearTimeout(game.ai.expired)
		game.ai.data.push({
			role: 'assistant',
			content: response.data.result
		})
		game.ai.is_first = false
		game.ai.expired = setTimeout(v => {
			clearTimeout(game.ai.expired)
			delete game.ai
		}, 5 * 60 * 1000)
		conn.ai.last_answer = Date.now()
		var {
			id
		} = await conn.reply(m.chat, response.data.result, m)
		game.ai.id = id
	} catch (e) {
		log(e);
		m.reply('oops, an error occured.')
	};
};
handler.command = ['ai'];

module.exports = handler;
