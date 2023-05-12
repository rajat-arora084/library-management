# Library Management

Library Management is a Node JS , MySQL based project for maintaing user details & books catalogue.

## Architectural Decisions

- Used Node JS as the programming language as it can support the database connectivity.
- Created 3 tables [users, books, user_books] for maintaing the third normal form of the database.

## Features

- User can view, borrow & return books in library.
- Data is also updated in DB.

## Tech

- [Node JS] -Console based application for view,borrow,return books.
- [MySQL] - Database for managing tables.

## Assumptions

- When a book is issued from the library, there are 2 queries that will be fired, one which updates the counter in books table & the second one for updating the book id in user_books table.
  I assumed that these DMLs will be successfully executed.
