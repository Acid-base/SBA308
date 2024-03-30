const {
  calculateLatePenalty,
  calculateAverageScore,
} = require("./calculations");
const { formatResults } = require("./resultsFormatting");

const processLearnerData = (courseInfo, assignmentGroup, submissions) => {
  const learnerData = {};

  const processLearnerSubmissionData = (submissions) => {
    const learnerSubmissionData = [];
    submissions.forEach((submission) => {
      const { learner_id, assignment_id, numsubmission } = submission;
      learnerSubmissionData.push({
        learner_id,
        assignment_id,
        submission,
      });
    });
    return learnerSubmissionData;
  };

  submissions.forEach((submission) => {
    const assignment = assignmentGroup.assignments.find(
      (a) => a.id === submission.assignment_id
    );
    const latePenalty = calculateLatePenalty(
      new Date(assignment.due_at),
      new Date(submission.submitted_at)
    );

    if (!learnerData[submission.learner_id]) {
      learnerData[submission.learner_id] = {
        totalPossible: assignmentGroup.assignments.reduce(
          (acc, a) => acc + a.points_possible,
          0
        ),
        totalLatePenalty: 0,
        assignmentScores: {},
      };
    }
    learnerData[submission.learner_id].assignmentScores[
      submission.assignment_id
    ] = submission.score;
    learnerData[submission.learner_id].totalLatePenalty += latePenalty;
  });

  for (const learnerId in learnerData) {
    const assignmentScores = learnerData[learnerId].assignmentScores;
    learnerData[learnerId].averageScore = calculateAverageScore(
      Object.values(assignmentScores).reduce((acc, score) => acc + score, 0),
      learnerData[learnerId].totalPossible
    );
  }

  const result = formatResults(Object.values(learnerData));
  return result;
};

module.exports = { processLearnerData };
