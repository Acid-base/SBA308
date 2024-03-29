// index.js

// Import required modules
import { validateData } from "dataValidation.js";
import { calculateLatePenalty, calculateAverageScore } from "./calculations.js";
import { formatResults } from "./resultsFormatting.js";

// Main function to process learner data
function processLearnerData(course, assignmentGroup, submissions) {
  // Validate input data
  validateData(course, assignmentGroup, submissions);

  // Perform calculations
  const result = [];

  submissions.forEach((submission) => {
    // Process each submission
    // Calculate late penalty
    const assignment = assignmentGroup.assignments.find(
      (a) => a.id === submission.assignment_id
    );
    const dueDate = new Date(assignment.due_at);
    const submittedDate = new Date(submission.submission.submitted_at);
    const latePenalty = calculateLatePenalty(dueDate, submittedDate);

    // Update total score and total possible points for the learner
    const learnerIndex = result.findIndex(
      (item) => item.id === submission.learner_id
    );
    const learnerData = result[learnerIndex] || {
      id: submission.learner_id,
      totalScore: 0,
      totalPossible: 0,
      scores: {},
    };
    learnerData.totalScore += submission.submission.score * latePenalty;
    learnerData.totalPossible += assignment.points_possible;
    learnerData.scores[assignment.id] =
      submission.submission.score / assignment.points_possible;

    // Add or update learner data in the result array
    if (!result[learnerIndex]) {
      result.push(learnerData);
    }
  });

  // Calculate average score
  result.forEach((learnerData) => {
    learnerData.avg = calculateAverageScore(
      learnerData.totalScore,
      learnerData.totalPossible
    );
  });

  // Format results
  return formatResults(result);
}

// Example usage:
// const course = { id: 451, name: "Introduction to JavaScript" };
// const assignmentGroup = { id: 12345, name: "Fundamentals of JavaScript", ... };
// const submissions = [ { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } }, ... ];
// const result = processLearnerData(course, assignmentGroup, submissions);
// console.log(result);

export default {
  processLearnerData,
};
