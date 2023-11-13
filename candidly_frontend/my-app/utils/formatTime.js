import React from 'react'

function formatTime(timestamp) {
    const currentDate = new Date();
    const messageDate = new Date(timestamp);
  
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  
    // Calculate the time difference in days
    const daysDifference = Math.floor((currentDay - messageDay) / (24 * 60 * 60 * 1000));
    const dayOptions = { weekday: 'long' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
  
    if (daysDifference >= 7) {
      return messageDate.toLocaleString();
    } else if (daysDifference > 0 && daysDifference < 2) {
      return (
        <div>
          <p>
            Yesterday
          </p>
          <p>
            {messageDate.toLocaleTimeString([], timeOptions)}
          </p>
        </div>
      );
    } else if (daysDifference === 0) {
        return (
          <div>
            <p>Today</p>
            <p>{messageDate.toLocaleTimeString([], timeOptions)}</p>
          </div>
        );
    } else {
      return (
        <div className='responsive-containe'>
          <div>{messageDate.toLocaleDateString('en-US', dayOptions)}</div>
          <div>{messageDate.toLocaleTimeString([], timeOptions)}</div>
        </div>
      )
    }
  }
  
  // Example usage:
  const timestamp = "2023-11-01T15:03:25.871Z";
  const formattedTime = formatTime(timestamp);
  console.log(formattedTime);
  
  

export default formatTime