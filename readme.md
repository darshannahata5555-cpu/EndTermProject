Personal Finance Tracker (Vanilla JavaScript)

Project Title & Description
Personal Finance Tracker is a browser-based web application built using HTML, CSS, and Vanilla JavaScript.
It allows users to track income and expense transactions, view financial summaries, analyze spending by category, and visualize expenses using charts.

All data is stored using LocalStorage, ensuring persistence even after page refreshes.
The project focuses on DOM manipulation, event-driven programming, and client-side state handling, without using any frontend frameworks.

Problem Statement
Managing daily income and expenses becomes difficult when transactions are not organized or tracked consistently.
This project solves that problem by allowing users to:
Record income and expenses
Categorize transactions
View summaries and spending patterns
Analyze expenses visually
All directly in the browser with instant DOM updates.


Features Implemented
Add transactions (Income / Expense) with:
Description
Amount
Category
Date
Automatic financial summary:
Total Income
Total Expenses
Current Balance
Transaction filtering by:
Type (Income / Expense)
Category
Transaction history list with delete functionality
Category-wise expense analysis with visual bars
Expense breakdown pie chart using HTML Canvas
Persistent data storage using LocalStorage
Responsive UI with a basic mobile-friendly layout

DOM Concepts Used
DOM Selection & Updates
getElementById
querySelector
Updating text using textContent
Dynamic DOM Rendering
Creating and appending elements using JavaScript
Rendering transaction list items dynamically
Generating category analysis cards programmatically

Conditional Rendering
Displaying messages like:
“No transactions yet”
“Add expenses to see breakdown”
Changing balance styling when the balance becomes negative
Event Handling
Form submission handling using preventDefault()
Dropdown change events (onchange)
Button click handlers (onclick)
Canvas API
Drawing an expense breakdown pie chart using:
canvas.getContext("2d")


Steps to Run the Project
Clone the repository:
git clone [https://github.com/darshannahata5555-cpu/EndTermProject]
Open the project folder.
Open index.html in any modern web browser.
Start adding income and expense transactions.
No additional setup or dependencies required.


Known Limitations
Data is stored only in LocalStorage (no cloud or backend support).
No authentication or multi-user support.
Charts are basic and not animated.
No export or import of transaction data.
