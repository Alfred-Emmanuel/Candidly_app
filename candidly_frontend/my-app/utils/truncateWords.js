// import React from 'react'

function truncateWords(text, maxWords) {
    const words = text.split(' ');
  
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
  
    return text;
  }
  

export default truncateWords