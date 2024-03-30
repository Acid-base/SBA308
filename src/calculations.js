const calculateLatePenalty = (dueDate, submittedDate) =>
  // Check  if the submission was late
  submittedDate > dueDate
    ? // If it was late, calculate the penalty (90%)
      0.9
    : // If it was not late, calculate the full score (100%)
      1;
const calculateAverageScore = (totalScore, totalPossible) =>
  // Calculate the average score by dividing the total score by the total possible score
  totalScore / totalPossible;
module.exports = {
  calculateLatePenalty,
  calculateAverageScore,
};
