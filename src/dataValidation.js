
// Validates the input data.
function validateData(course, assignmentGroup , submissions) {
  // Check if any of the input data is null or undefined.
  if (!course || !assignmentGroup || !submissions)  {
    // If any of the input data is null or undefined, throw an error.
    throw new Error("Invalid input data.");
  }

  // Create an array of valid data types.
  const validTypes = [
    { type: "object", value: course },
     { type: "object", value: assignmentGroup },
    { type: "array", value: assignmentGroup.assignments },
    { type: "array", value: submissions },
  ];

  // Iterate over the array of valid data types.
  validTypes.forEach(({ type, value }) => {
    // Check if the data type of the value matches the expected type.
    if (typeof value !== type) {
      // If the data type of the value does not match the expected type, throw an error.
      throw new Error("Invalid data type.");
    }
   });

  // Check if the course_id of the assignmentGroup matches the id of the course.
  if (assignmentGroup.course_id !== course.id) {
    // If the course_id of the assignmentGroup does not match the id of the course, throw an error.
    throw new Error("AssignmentGroup does not belong to the specified course.");
  }
}
