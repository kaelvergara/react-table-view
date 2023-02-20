import React from "react";
import { render } from "react-dom";
import TableView from "./TableView";
import "./styles.css";

// User Courses Table View

// Create a table view of the users list and their selected course

// PHASE 1: Table structure
// Display a table view of users and their respective course selection
// Use the below APIs to get the list of users and the list of users courses
// List of users: https://gist.githubusercontent.com/JCGonzaga01/36a8af85464d998221c71ea3eaa57225/raw/6fe851e029ee98e9ec85ceb87433ed5ed0f06e36/users.json
// List of Users' Courses: https://gist.githubusercontent.com/JCGonzaga01/9c9e3590fb23274263678b6c4bcf9963/raw/600c8281f9db7eaba959a732912eba350bf7387d/user-course-selection.json
// Kindly refer to the below table structure sample
// for "Semester Fee" column, default currency type is USD.

//Table Structure sample
// Search:________
// Name   | Phone | Email | Course Name  | Course Selection | Semester | Semester Fee
// User1  | 111...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
// User2  | 111...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
// User12 | 333...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
//...

// PHASE 2: Fuzzy Search
// Add fuzzy searching for anything listed in the table.
// State needs to be organized in a way to allow searching.
// Fuzzy searching against name, phone or email.
// if no result, show "No data found"
// Note: Case Insensitive && Don't use third party library

//Table Structure sample1  for Fuzzy Search Result
// Search: User1
// Name   | Phone | Email | Course Name  | Course Selection | Semester | Semester Fee
// User1  | 111...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
// User12 | 333...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
//...

//Table Structure sample2  for Fuzzy Search Result
// Search: 111
// Name   | Phone | Email | Course Name  | Course Selection | Semester | Semester Fee
// User1  | 111...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
// User2  | 111...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
//...

//Table Structure sample3  for Fuzzy Search Result
// Search: 1
// Name   | Phone | Email | Course Name  | Course Selection | Semester | Semester Fee
// User1  | 111...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
// User2  | 111...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
// User12 | 333...|user@..|
//        |       |       | course1      | selection        | fall...  | $ 123.00
//        |       |       | course2      | selection        | spring...| $ 123.00
//...

// PHASE 3: Table Sorting (Ascending/Descending)
// Sorting against name, phone and email.
// No default sorting. Show the data based on the arrangment from the users.json.
// If same phone/email, second sorting is by name (ascending).

//Table Structure sample1  for Sorting Phone Ascending
// Search:________
// Name   | Phone ^| Email | Course Name  | Course Selection | Semester | Semester Fee
// User1  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User2  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User12 | 333... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
//...

//Table Structure sample2  for Sorting Phone Descending
// Search:________
// Name   | Phone v| Email | Course Name  | Course Selection | Semester | Semester Fee
// User12 | 333... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User1  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User2  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
//...

// PHASE 4: Clean data
// Make sure to remove duplicate data. If same user, course name, course selection and semester
// If user has no course selected, show "No data found".

//Table Structure if no course selected
// Search:________
// Name   | Phone  | Email | Course Name  | Course Selection | Semester | Semester Fee
// User12 | 333... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User2  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User1  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User123| 444... |user@..|
//                       "No data found"
//...

// PHASE 5: Convert currency data
// Implement a drop down of currency type using this API: https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json
// Default value (base currency type) is USD.
// When selected new currency type,  "Semester Fee" must update the value based on the curren exchange rate.
// Use this API docs to determine the current exchange rate: https://www.exchangerate-api.com/docs/pair-conversion-requests
// API_KEY: 679aae77947f03c9abd287ec OR 3d609826d7238787d81cfc47
// (if both API_KEY reach it's limit, kindly register and get your personal API_KEY here: https://www.exchangerate-api.com/)
// Note:
// If exchangerate-api throws an error, show an error message.

//Table Structure sample1
// Search:________
// Currency Type: USD
// Name   | Phone v| Email | Course Name  | Course Selection | Semester | Semester Fee
// User12 | 333... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User1  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
// User2  | 111... |user@..|
//        |        |       | course1      | selection        | fall...  | $ 123.00
//        |        |       | course2      | selection        | spring...| $ 123.00
//...

//Table Structure sample2 with error
// Search:________
// Currency Type: MLZ
//
// "Unsupported currency type"

// NOTES:
// No JQuery, No DOM manipulation
// Make sure to test sorting while using a fuzzy search
// UI is not that important, as long as table and table headers are readable and understanble esp with sorting indicator
// We will check more on your code implementation and the way you managed your variables/states/functions.
// You can use either axios or fetch or XMLHttpRequest for REST API
// All phases must be implemented by your own solution, DO NOT use any third party library like fuzzjs/fusejs or alike.
// Use of React class component vs functional component (react hooks is allowed) whichever you prefer.

// function TableView() {
//   return "Hello World!";
// }

render(<TableView />, document.getElementById("root"));
