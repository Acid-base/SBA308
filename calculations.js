// calculations.js

// Function to calculate late submission penalty
function calculateLatePenalty(dueDate, submittedDate) {
  return submittedDate > dueDate ? 0.9 : 1;
}

// Function to calculate average score
function calculateAverageScore(totalScore, totalPossible) {
  return totalScore / totalPossible;
}

module.exports = {
  calculateLatePenalty,
  calculateAverageScore,
};
