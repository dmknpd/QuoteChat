const axios = require("axios");

async function getRandomQuote() {
  try {
    const quoteResponse = await axios.get("https://api.quotable.io/random");
    const quote = quoteResponse.data.content;

    return quote;
  } catch (error) {
    console.error("Error fetching quote: ", error.message);
    throw new Error("Failed to fetch quote");
  }
}

module.exports = getRandomQuote;
