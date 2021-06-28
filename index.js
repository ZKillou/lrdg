// Ne rien modifier !
// LaRADIOdugaming module by CreeperGames
// v0.3.0

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

const main = () => {
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
		details: `🎵 Écoute : ${d.actuel.title}`,
		state: `⏭ Puis : ${d.queue[0].title}`,
		startTimestamp: d.startAt,
		endTimestamp: end,
		largeImageKey: "large",
		largeImageText: "Lesalondugaming (lrdg-v0.3.0)",
		buttons: [{
			label: "Écouter la musique",
			url: "http://laradiodugaming.glitch.me/listen"
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

client.on('ready', () => {
	console.log(`Connecté à votre discord, ${client.user.username} !`)
	main()
});
