// resultsFormatting.js

// Function to format results
function formatResults(result) {
  return result.map((learnerData) => ({
    id: learnerData.id,
    avg: learnerData.avg,
    ...learnerData.scores, // Spread individual assignment scores
  }));
}

module.exports = {
  formatResults,
};
