// Ne rien modifier !
// LaRADIOdugaming module by CreeperGames
// v0.2.0

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
			if(!data.isPlaying){
				console.log("Aucune musique est en cours de lecture")
				return process.exit()
			}
			setStatus(data)
		})
}

const setStatus = (d) => {
	let end = d.startAt + d.actuel.duration
	let obj = {
		details: `Écoute : ${d.actuel.title}`,
		state: `Ensuite viendra : ${d.queue[0].title}`,
		startTimestamp: d.startAt,
		endTimestamp: end,
		largeImageKey: "large",
		largeImageText: "lrdg-0.2.0",
		buttons: [{
			label: "Serveur Discord",
			url: "https://discord.gg/bAhSy7B"
		}, {
			label: "Site Internet",
			url: "https://laradiodugaming.glitch.me/"
		}]
	}
	if(d.actuel.crowned){
		obj.smallImageKey = "crowned"
		obj.smallImageText = `Couronné en ${d.actuel.crowned}`
	} else if(d.actuel.isBest) {
		obj.smallImageKey = "sparkles"
		obj.smallImageText = "Meilleure des musiques"
	} else {
		obj.smallImageKey = "small"
		obj.smallImageText = "OST/Animé"
	}
	client.setActivity(obj).then(() => {
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
