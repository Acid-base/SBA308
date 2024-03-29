function getLearnerData(course, ag, submissions) {
  // Validate input data types and format
  if (
    typeof course !== "object" || // Check if course is an object
    typeof ag !== "object" || // Check if ag is an object
    !Array.isArray(ag.assignments) || // Check if ag.assignments is an array
    !Array.isArray(submissions) // Check if submissions is an array
  ) {
    throw new Error("Invalid input data format."); // Throw error if input format is invalid
  }

  // Check if AssignmentGroup belongs to the specified course
  if (ag.course_id !== course.id) {
    throw new Error("AssignmentGroup does not belong to the specified course."); // Throw error if AssignmentGroup doesn't belong to specified course
  }

  // Initialize an empty array to store the result
  const result = [];

  // Iterate through assignments to check due dates
  ag.assignments.forEach((assignment) => {
    const dueDate = new Date(assignment.due_at);
    const now = new Date();
    if (dueDate > now) {
      throw new Error(`Assignment "${assignment.name}" is not yet due.`); // Throw error if assignment is not yet due
    }
  });

  // Iterate through learner submissions
  submissions.forEach((submission) => {
    // Find the index of the learner's data in the result array
    const learnerIndex = result.findIndex(
      (item) => item.id === submission.learner_id
    );
    // Initialize or retrieve learner data object
    const learnerData = result[learnerIndex] || {
      id: submission.learner_id,
      totalScore: 0,
      totalPossible: 0,
    };

    // Find the corresponding assignment for the submission
    const assignment = ag.assignments.find(
      (a) => a.id === submission.assignment_id
    );
    if (!assignment) {
      throw new Error(
        `Submission for non-existent assignment ID: ${submission.assignment_id}`
      ); // Throw error if submission is for a non-existent assignment
    }

    // Calculate late submission penalty
    const dueDate = new Date(assignment.due_at);
    const submittedDate = new Date(submission.submission.submitted_at);
    const latePenalty = submittedDate > dueDate ? 0.9 : 1; // Apply late submission penalty if applicable

    // Update total score and total possible points for the learner
    learnerData.totalScore += submission.submission.score * latePenalty;
    learnerData.totalPossible += assignment.points_possible;

    // Add or update learner data in the result array
    if (!result[learnerIndex]) {
      result.push(learnerData); // If learner data doesn't exist, push it to the result array
    }
  });

  // Calculate average score and individual assignment scores for each learner
  result.forEach((learnerData) => {
    learnerData.avg = learnerData.totalScore / learnerData.totalPossible; // Calculate average score for each learner

    // Calculate percentage score for each assignment
    ag.assignments.forEach((assignment) => {
      const submission = submissions.find(
        (s) =>
          s.learner_id === learnerData.id && s.assignment_id === assignment.id
      );

      if (submission) {
        learnerData[assignment.id] =
          submission.submission.score / assignment.points_possible; // Calculate percentage score for each assignment submitted by the learner
      }
    });

    // Remove temporary properties used for calculations
    delete learnerData.totalScore;
    delete learnerData.totalPossible;
  });

  return result; // Return the processed learner data
}
