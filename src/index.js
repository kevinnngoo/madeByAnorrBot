require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("clientReady", () => {
  console.log(`Annorr Bot is online as ${client.user.tag}`);
  setupScheduledPosts();
});

// Scheduled auto-posts (runs daily at 3:00 PM)
function setupScheduledPosts() {
  // Cron format: minute hour day month weekday
  // "0 15 * * *" = every day at 3:00 PM (15:00)
  cron.schedule("0 15 * * *", async () => {
    const channelId = process.env.ANNOUNCEMENT_CHANNEL_ID;
    if (!channelId || channelId === "your_channel_id_here") {
      console.log("⚠️ ANNOUNCEMENT_CHANNEL_ID not configured in .env");
      return;
    }

    try {
      const channel = await client.channels.fetch(channelId);
      channel.send(
        "✨ **Daily Reminder!** ✨\n\nCheck out our latest embroidery designs at **madebyannorr**!\n🎉 Don't miss our giveaways and exclusive content!\n\nhttps://www.instagram.com/madebyannorr/"
      );
      console.log("📢 Scheduled post sent successfully");
    } catch (error) {
      console.error("❌ Failed to send scheduled post:", error.message);
    }
  });
  
  console.log("⏰ Scheduled posts enabled (daily at 3:00 PM)");
}

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  // Existing commands
  if (message.content === "!annorr") {
    message.channel.send(
      "🧵 Annorr Bot here! Check out **madebyannorr** for embroidery designs and giveaways.\nhttps://www.instagram.com/madebyannorr/"
    );
  }

  if (message.content === "!giveaway") {
    message.channel.send(
      "🎉 Current giveaway info will be posted here soon. Stay tuned and support **madebyannorr**!"
    );
  }

  // New !announce command (admin only)
  if (message.content.startsWith("!announce ")) {
    // Check if user is admin
    if (message.author.id !== process.env.ADMIN_USER_ID) {
      message.reply("❌ Only admins can use this command.");
      return;
    }

    // Get the announcement text after "!announce "
    const announcement = message.content.slice(10).trim();
    
    if (!announcement) {
      message.reply("Usage: `!announce Your message here`");
      return;
    }

    // Send to announcement channel
    const channelId = process.env.ANNOUNCEMENT_CHANNEL_ID;
    if (!channelId || channelId === "your_channel_id_here") {
      message.reply("⚠️ Announcement channel not configured. Add ANNOUNCEMENT_CHANNEL_ID to .env");
      return;
    }

    client.channels.fetch(channelId)
      .then(channel => {
        channel.send(`📣 **New Announcement!**\n\n${announcement}\n\n_Posted by ${message.author.username}_`);
        message.reply("✅ Announcement posted!");
      })
      .catch(error => {
        message.reply(`❌ Failed to post announcement: ${error.message}`);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
