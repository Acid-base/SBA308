# Course Data Analyzer

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

## Features

- Validates input
- Calculates scores and penalties
- Calculates average score
- Formats processed data
