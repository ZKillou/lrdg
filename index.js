// Ne rien modifier !
// LaRADIOdugaming module by CreeperGames
// v0.0.1

const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8082 })
const RPC = require("discord-rpc")

console.log("Le fichier est en cours d'exécution !")

wss.on("connection", ws => {
	console.log("Connecté à votre navigateur.")
	const clientId = '767777944096604241';
	const client = new RPC.Client({ transport: 'ipc' });

	client.on('ready', () => {
		console.log(`Connecté à votre discord, ${client.user.username} !`)
		ws.on("message", async data => {
			console.log("Récupération")
			let object = JSON.parse(data)
			object = JSON.parse(object)
			await client.clearActivity()
			if(object.isPlaying){
				console.log("Lecture en cours ...")
				client.setActivity({
					details: `Ecoute : ${object.songTitle}`,
					state: 'Dans le salon vocal.',
					startTimestamp: object.startAt,
					endTimestamp: object.startAt + (object.songDuration * 1000)
				}).then(() => console.log("Activité mise à jour !")).catch(error => { console.error(error); ws.close() });
			}
		})
	});
	
	client.login({ clientId }).catch(error => {
		console.error(error)
		ws.close()
	})
	
	ws.on("close", () => {
		console.log("Déconnection détéctée")
	})
})