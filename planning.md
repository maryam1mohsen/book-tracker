**Project Overview:**
The project aims to develop a book tracking website where users can log books they have read and organize their reading lists. The website will offer a user-friendly interface and various features to enhance the user experience, such as a searchable book database.

**Scope:**
**User Accounts:**
- User registration and login functionality.
- User profiles with personal information and reading history.
- Password reset and account management.

**Book Management:**
- Add new books with details like title, author, genre, and cover image.
- Edit or delete book entries.
- Search and filter books by various criteria (genre, author).

**Book Logging:**
- Users can log books they have read, mark them as "reading" or "to-read."

**Responsive Design:**
- Ensure the website is accessible on various devices (desktop, tablet, mobile).

### ERD (Entity-Relationship Diagram)

**User Model:**
- _id (ObjectId)
- username (String)
- email (String)
- password (String)
- bio (String)
- profilePic (String)

**List Model:**
- _id (ObjectId)
- userId (ObjectId, reference to User)
- books (Array of ObjectId, references to Book)
- status (String, enum: ["to-read", "reading", "completed"])
- createdAt (Date)
- updatedAt (Date)

**Book Model:**
- _id (ObjectId)
- title (String)
- author (String)
- genre (String)
- description (String)
- coverImage (String)

### User Stories

**As a user, I want to register an account so that I can track my reading progress.**

**As a user, I want to log books I have read, so I can keep a record of my reading history.**

**As a user, I want to search for books by title, author, or genre, so I can find books I am interested in.**

**As a user, I want to edit my profile information, so I can update my preferences and personal details.**

**As a user, I want to access the website from different devices, so I can use it on the go.**

**As a user, I want to create lists of books with statuses such as "to-read," "reading," or "completed," so I can organize my reading progress better.**

