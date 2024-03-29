// dataValidation.js

// Function to validate input data
function validateData(course, assignmentGroup, submissions) {
  if (
    typeof course !== "object" ||
    typeof assignmentGroup !== "object" ||
    !Array.isArray(assignmentGroup.assignments) ||
    !Array.isArray(submissions)
  ) {
    throw new Error("Invalid input data format.");
  }

  if (assignmentGroup.course_id !== course.id) {
    throw new Error("AssignmentGroup does not belong to the specified course.");
  }
}

module.exports = {
  dataValidation,
};
