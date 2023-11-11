import React from 'react'

function formatTime(timestamp) {
    const currentDate = new Date();
    const messageDate = new Date(timestamp);
  
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  
    // Calculate the time difference in days
    const daysDifference = Math.floor((currentDay - messageDay) / (24 * 60 * 60 * 1000));
  
    if (daysDifference >= 7) {
      // Show the actual date if it has exceeded one week
      return messageDate.toLocaleString();
    } else if (daysDifference > 0 && daysDifference < 2) {
      // Show "yesterday at HH:mm" if it has exceeded one day
      return `Yesterday at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (daysDifference === 0) {
        // Show "Today at HH:mm" if the message was sent today
        return `Today at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      // Show the day of the week at HH:mm for other cases
      const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
      return messageDate.toLocaleDateString('en-US', options);
    }
  }
  
  // Example usage:
  const timestamp = "2023-11-01T15:03:25.871Z";
  const formattedTime = formatTime(timestamp);
  console.log(formattedTime);
  
  

export default formatTime