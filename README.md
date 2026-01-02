# Annorr Bot

Discord bot for the madebyannorr community - promoting embroidery designs, giveaways, and social engagement.

## Features

- 🧵 Brand information commands
- 🎉 Giveaway announcements
- 📢 Admin announcement system
- ⏰ Scheduled promotional posts (daily at 3 PM)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your credentials:
```env
DISCORD_TOKEN=your_bot_token
APPLICATION_ID=your_app_id
PUBLIC_KEY=your_public_key
ANNOUNCEMENT_CHANNEL_ID=your_channel_id
ADMIN_USER_ID=your_user_id
```

3. Run the bot:
```bash
node src/index.js
```

## Commands

- `!annorr` - Display brand info and Instagram link
- `!giveaway` - Show current giveaway information
- `!announce <message>` - Post announcement to configured channel (admin only)

## Tech Stack

- Node.js
- Discord.js
- node-cron for scheduled posts
- dotenv for environment variables
