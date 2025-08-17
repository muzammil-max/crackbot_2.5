client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set the bot's activity
  client.user.setActivity(".gg/CrackEducation", { type: ActivityType.Watching });

  // --- START: Code to send messages from your console ---

  // To get a channel ID:
  // 1. In Discord, go to User Settings > Advanced and enable "Developer Mode".
  // 2. Right-click on the channel you want to send messages to (e.g., #yapp) and click "Copy Channel ID".
  // 3. Paste the ID here, replacing "YOUR_CHANNEL_ID_HERE".
  const TARGET_CHANNEL_ID = "YOUR_CHANNEL_ID_HERE";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // A message to let you know the feature is active
  console.log(
    "\n[CONSOLE SENDER] Bot is ready. Type a message below and press Enter to send it to the server."
  );

  rl.on("line", async (input) => {
    const messageToSend = input.trim();
    if (!messageToSend) return; // Don't send empty messages

    // Check if the user has replaced the placeholder ID
    if (TARGET_CHANNEL_ID === "YOUR_CHANNEL_ID_HERE") {
      console.error(
        "[ERROR] Please set the TARGET_CHANNEL_ID in your code before sending messages."
      );
      return;
    }

    try {
      const channel = await client.channels.fetch(TARGET_CHANNEL_ID);
      if (channel && channel.isTextBased()) {
        await channel.send(messageToSend);
        console.log(`[SUCCESS] Sent to #${channel.name}: "${messageToSend}"`);
      } else {
        console.error(
          `[ERROR] Channel with ID ${TARGET_CHANNEL_ID} not found or is not a text channel.`
        );
      }
    } catch (error) {
      console.error(`[ERROR] Failed to send message: ${error.message}`);
    }
  });
  // --- END: Code to send messages from your console ---
});
