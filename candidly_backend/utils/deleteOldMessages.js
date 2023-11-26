const mongoose = require('mongoose');
const cron = require('node-cron');
const { Message } = require("../models/message")


mongoose.connect('mongodb://localhost:27017/candidly', { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect( process.env.LOCAL_DB , { useNewUrlParser: true, useUnifiedTopology: true });

// Define a cron job that runs every day at a specific time
cron.schedule('50 11 * * *', async () => {
  try {
    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Delete messages older than 7 days
    const result = await Message.deleteMany({
        timestamp: { $lt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
      });      

    console.log(`${result.deletedCount} messages deleted.`);
  } catch (error) {
    console.error('Error deleting messages:', error);
  }
});

// Keep the script running
process.stdin.resume();
