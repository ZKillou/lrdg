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

const getter = () => {
	fetch("https://laradiodugaming.glitch.me/np/json")
		.then(res => res.json())
		.then(body => {
			data = body
			console.log("Les données ont été récupérées avec succès !")
			setStatus(data)
		})
}

const setStatus = (d) => {
	let end = d.startAt + d.actuel.duration
	client.setActivity({
		details: `Écoute : ${d.actuel.title}`,
		state: `Ensuite viendra : ${d.queue[0].title}`,
		startTimestamp: d.startAt,
		endTimestamp: end
	}).then(() => {
		console.log("Activité mise à jour !")
		setTimeout(() => main(), 15000)
	}).catch(error => console.error(error))
}

const main = async () => {
	await getter()
}

client.on('ready', () => {
	console.log(`Connecté à votre discord, ${client.user.username} !`)
	main()
});
