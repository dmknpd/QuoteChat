const axios = require("axios");

async function getRandomQuote() {
  try {
    const quoteResponse = await axios.get(
      "https://stoic.tekloon.net/stoic-quote"
    );
    let quote = quoteResponse.data.data.quote;

    if (quote.endsWith("@")) {
      quote = quote.slice(0, -1).trim();
    }

    return quote;
  } catch (error) {
    console.error("Error fetching quote: ", error.message);
    throw new Error("Failed to fetch quote");
  }
}

module.exports = getRandomQuote;
