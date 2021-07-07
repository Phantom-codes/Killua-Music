module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`   ___  _  _ _    ___ _  _ ___ `);
        console.log("  / _ \\| \\| | |  |_ _| \\| | __|")
        console.log(" | (_) | .` | |__ | || .` | _|")
        console.log("  \\___/|_|\\_|____|___|_|\\_|___|")
        client.user.setPresence({ activity: { name: `Music and Vibing || KL ! PLAY`, type: "LISTENING" } })
    },
};