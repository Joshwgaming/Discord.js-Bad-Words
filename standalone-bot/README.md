# Discord.js-Bad-Words - Delete/mute for harmful/malicious words

### Now updated & working with discord.js v13.6.0!

Automatically delete messages that contain bad words and mute/warn the user for doing so.

This code can work as a standalone bot, or it can be added to your existing discord.js bot code. Find instructions below of how to install as a standalone bot.

If you have any issues with setting up this code as a standalone bot, or merging it into your existing code, feel free to open an issue and I will be happy to assist

Note: I will not provide direct instructions on how to merge this code with your existing code, however I will provide advice in issues if needed.

#### This code was last tested & working with `discord.js v13.6.0` & `node.js v16.3.0`.

### Prerequisites for this to work:
- You will need to of created your discord bot on the discord developer portal.
- Your discord bot must have the following permissions: `View channels`, `Manage roles`, `Send messages`, `Manage messages`, `Read message history` (The bot will work if the Administrator permission is granted, but this is not recommended).

## How to set up as a standalone bot:
- Download code from github.
- Add your bot token into config.json.
- Add your logging channel id into config.json (OPTIONAL).
- Install required packages through `npm install`.
- Replace the words in `badWordsTier1.json` with the words you wish to mute for 28d for.
- Replace the words in `badWordsTier2.json` with the words you wish to mute for 1h for.
- Replace the words in `badWordsTier3.json` with the words you wish to warn for.
- Start your bot by typing `node index.js` in your terminal.

If set up correctly, your bot should be running & working.
