// Ne rien modifier !
// LaRADIOdugaming module by CreeperGames
// v0.1.0

const RPC = require("discord-rpc")
const fetch = require("node-fetch")

console.log("Le fichier est en cours d'exécution !")
const clientId = '767777944096604241';
const client = new RPC.Client({ transport: 'ipc' });
let data

client.login({ clientId }).catch(error => {
	console.error(error)
	process.exit()
})

const main = async () => {
	await getter()
	setStaus(data)
}

const getter = () => {
	fetch("https://laradiodugaming.glitch.me/np/json")
		.then(res => res.json())
		.then(body => data = body)
	console.log("Les données ont été récupérées avec succès !")
}

const setStatus = (d) => {
	let end = d.startAt + (d.songDuration * 1000)
	client.setActivity({
		details: `Ecoute : ${d.songTitle}`,
		state: 'Dans le salon vocal.',
		startTimestamp: d.startAt,
		endTimestamp: end
	}).then(() => {
		console.log("Activité mise à jour !")
		setTimeout(async () => main(), end + 10000)
	}).catch(error => console.error(error))
}

client.on('ready', () => {
	console.log(`Connecté à votre discord, ${client.user.username} !`)
	main()
});
