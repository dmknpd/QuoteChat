const axios = require("axios");

async function getRandomQuote() {
  try {
    const quoteResponse = await axios.get("https://zenquotes.io/api/random");
    const quote = quoteResponse.data[0].q;

    return quote;
  } catch (error) {
    console.error("Error fetching quote: ", error.message);
    throw new Error("Failed to fetch quote");
  }
}

module.exports = getRandomQuote;
