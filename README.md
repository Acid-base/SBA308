# Course Data Analyzer

This project analyzes course data and learner submissions to calculate weighted average scores, taking into account late penalties and potential data inconsistencies.

**Functionality**

- Calculates weighted averages based on assignment groups and points possible.
- Applies a 10% late submission penalty.
- Validates data to ensure assignment groups belong to the correct course.
- Handles potential errors (e.g., division by zero, invalid data types).

**Output**
An array of learner result objects, each containing:

- `id`: Learner ID
- `avg`: Weighted average score
- `<assignment_id>`: Score percentage for each assignment (if due)

**Project Structure**

- `src/dataValidation.js`: Data validation functions
- `src/calculations.js`: Calculation logic
- `src/resultsFormatting.js`: Result object formatting
- `src/index.js`: Main entry point
- '

## Introduction

The Learner Data Processor is a tool intended to assist educators in analyzing learner performance within educational courses. It processes data related to learner submissions, calculates scores, and provides insights into learner progress and performance.

## Features

- Validates input
- Calculates scores and penalties
- Calculates average score
- Formats processed data
