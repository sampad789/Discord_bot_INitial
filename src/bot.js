require("dotenv").config();

const { Client } = require("discord.js");

const client = new Client();
const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in `);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [commandName, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (commandName === "kick") {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You do not have permission to use that command ");
      if (args.length === 0) return message.reply("Please provide an Id ");
      const member = message.guild.members.cache.get(args[0]);
      //console.log(member);
      if (member) {
        member
          .kick()
          .then((member) =>
            message.channel
              .send(`${member} Was kicked SuccessFully`)
              .catch((err) => message.channel.send("I cannot kick the member"))
          );
      } else {
        message.channel.send("Member not found ");
      }
      // message.channel.send("Kicked the user " + args);
    } else if (commandName === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("User was banned successfully");
      } catch (err) {
        console.log(err);
        message.channel.send(
          "An error occured. Either I do not have permissions or the user was not found"
        );
      }
    }
  }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
