function getLearnerData(course, ag, submissions) {
  try {
    // Validate input data types and format
    if (
      typeof course !== "object" ||
      typeof ag !== "object" ||
      !Array.isArray(ag.assignments) ||
      !Array.isArray(submissions)
    ) {
      throw new Error("Invalid input data format.");
    }

    // Check if AssignmentGroup belongs to the specified course
    if (ag.course_id !== course.id) {
      throw new Error(
        "AssignmentGroup does not belong to the specified course."
      );
    }

    // Verify all assignments are due before proceeding
    ag.assignments.forEach((assignment) => {
      const dueDate = new Date(assignment.due_at);
      const now = new Date();
      if (dueDate > now) {
        throw new Error(`Assignment "${assignment.name}" is not yet due.`);
      }
    });

    // Initialize the array to store the calculated learner data
    const result = [];

    // Iterate through learner submissions to process scores
    submissions.forEach((submission) => {
      // Find if we already have data for this learner
      const learnerIndex = result.findIndex(
        (item) => item.id === submission.learner_id
      );

      // Create data for the learner if not found, otherwise retrieve existing data
      const learnerData = result[learnerIndex] || {
        id: submission.learner_id,
        totalScore: 0,
        totalPossible: 0,
      };

      // Find the assignment details corresponding to this submission
      const assignment = ag.assignments.find(
        (a) => a.id === submission.assignment_id
      );
      if (!assignment) {
        throw new Error(
          `Submission for non-existent assignment ID: ${submission.assignment_id}`
        );
      }

      // Calculate potential late submission penalty
      const dueDate = new Date(assignment.due_at);
      const submittedDate = new Date(submission.submission.submitted_at);
      const latePenalty = submittedDate > dueDate ? 0.9 : 1;

      // Update learner's scores
      learnerData.totalScore += submission.submission.score * latePenalty;
      learnerData.totalPossible += assignment.points_possible;

      // Add or update the learner's data in the result array
      if (!result[learnerIndex]) {
        result.push(learnerData);
      }
    });

    // Calculate final metrics for each learner
    result.forEach((learnerData) => {
      learnerData.avg = learnerData.totalScore / learnerData.totalPossible;

      // Calculate individual assignment scores
      ag.assignments.forEach((assignment) => {
        const submission = submissions.find(
          (s) =>
            s.learner_id === learnerData.id && s.assignment_id === assignment.id
        );

        if (submission) {
          learnerData[assignment.id] =
            submission.submission.score / assignment.points_possible;
        }
      });

      // Remove temporary properties
      delete learnerData.totalScore;
      delete learnerData.totalPossible;
    });

    return result;
  } catch (error) {
    // Handle and log the error for debugging and potential user feedback
    console.error("Error processing learner data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
