// exampleData.js

// Example course information
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// Example assignment group
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    // Add more assignments as needed
  ],
};

// Example learner submissions
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  // Add more submissions as needed
];

module.exports = {
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions,
};
