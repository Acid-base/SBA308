# SBA308

skills based assessment javascript

# Course Data Analyzer

This project analyzes course data and learner submissions to calculate weighted average scores, taking into account late penalties and potential data inconsistencies.

**Functionality**

- Calculates weighted averages based on assignment groups and points possible.
- Applies a 10% late submission penalty.
- Validates data to ensure assignment groups belong to the correct course.
- Handles potential errors (e.g., division by zero, invalid data types).

**Usage**

1. Install dependencies (if any): `npm install`
2. Prepare input data in the specified JSON formats.
3. Run the script: `node src/index.js <course_data> <assignment_groups> <learner_submissions>`

**Input Data Formats**

- See provided examples or project documentation.

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

