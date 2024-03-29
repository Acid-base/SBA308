// test.js

// Import the processLearnerData function from index.js
const { processLearnerData } = require("../index.js").default;

// Import example data
const {
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions,
} = require("exampleData.js");

// Function to compare arrays for equality
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false;
  }
  return true;
}

// Test case for processLearnerData function
function testProcessLearnerData() {
  const result = processLearnerData(
    CourseInfo,
    AssignmentGroup,
    LearnerSubmissions
  );
  // Define expected output based on example data
  const expectedOutput = [
    { id: 125, avg: 0.985, 1: 0.94, 2: 1 },
    { id: 132, avg: 0.82, 1: 0.78, 2: 0.833 },
  ];
  // Assert that the result matches the expected output
  if (arraysEqual(result, expectedOutput)) {
    console.log("Test passed: Output matches expected result.");
  } else {
    console.error("Test failed: Output does not match expected result.");
    console.log("Expected:", expectedOutput);
    console.log("Actual:", result);
  }
}

// Run the test
testProcessLearnerData();
