# Personal Finance Tracker (Vanilla JS)

## Project Title & Description
**Personal Finance Tracker** is a browser-based expense and income tracker built using **HTML, CSS, and Vanilla JavaScript**.  
Users can add income/expense transactions, filter them, view summaries (income, expenses, balance), analyze spending by category, and see an expense breakdown chart. Data is saved using **LocalStorage**, so it persists after refresh.

## Problem Statement
Managing daily income and expenses becomes difficult when transactions are not organized.  
This project helps users **record transactions**, **categorize them**, and **analyze spending patterns** directly in the browser with a clean UI and instant DOM updates.

## Features Implemented
- Add transactions (Income/Expense) with:
  - description, amount, category, date
- Automatic summary calculation:
  - Total Income, Total Expenses, Balance
- Filter transactions by:
  - Type (income/expense)
  - Category
- Transaction history list with delete option
- Category analysis section:
  - totals per category + visual bars
- Expense breakdown pie chart (Canvas)
- Persistent storage using **LocalStorage**
- Responsive UI (basic mobile-friendly layout)

## DOM Concepts Used
- DOM selection & updates:
  - `getElementById`, `querySelector`
  - updating text using `textContent`
- Dynamic element rendering using JavaScript:
  - building transaction list items and category cards
- Conditional rendering:
  - showing “No transactions yet” / “Add expenses to see breakdown”
  - changing balance style when negative
- Event handling:
  - form submission with `preventDefault()`
  - dropdown change events (`onchange`)
  - button click handlers (`onclick`)
- Canvas drawing:
  - pie chart rendering using `canvas.getContext("2d")`

   git clone [YOUR_REPO_LINK]
