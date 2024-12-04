# **IT Department Management System**

**Description**:  
This system displays the core and simple functions of CRUD operations. It enables users to view, add, update, and delete a student, officer, or an employee.

**Technologies Used**:  
- **Backend**: Express.js, MySQL  
- **Frontend**: HTML, CSS, Native JavaScript  
- **Database**: MySQL  
- **Others**:  
  - Multer (for file uploads)  
  - dotenv (for environment variables)  
  - Cors (for frontend verification)  

---

## **Backend Documentation**

### **1. Installation Instructions**

1. **Download the Folder**
   - Clone or download the repository from GitHub.

2. **Setup Database**
   - Open MySQL command line or a database management tool.
   - Execute the provided `.sql` script located in the folder to set up the database.

3. **Install Dependencies**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies using the following command:
     ```bash
     npm install
     ```

4. **Environment Setup**
   - Create a `.env` file in the backend folder.
   - Add the following environment variables:
     ```env
     PORT=4000
     DB_HOST=localhost
     DB_USER=root  # Your MySQL username
     DB_PASSWORD=password  # Your MySQL password
     DB_NAME=db_managementexample  # Your database name
     ```

5. **Run the Application**
   - Start the server using one of the following commands:
     ```bash
     nodemon index.js
     # or
     npm run dev
     ```

---

### **2. API Endpoints**

#### **Students**
- **GET `/students/`**: Fetches all students.
- **POST `/students/add-student`**: Adds a new student.  
  **Request Body Example**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "year": "3",
    "section": "A",
    "age": 20
  }

- **PUT `/students/:studentID`**: Updates a student by ID.
- **DELETE `/students/:studentID`**: Deletes a student by ID.

#### **Officers**
- **GET `/officers/`**: Fetches all officers.
- **POST `/students/add-officer`**: Adds a new officer.
  **Request Body Example**:
  ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "year": "3",
        "section": "A",
        "age": 20,
        "image": { "file upload" }
    }

- **PUT `/officer/:officerID`**: Updates an officer by ID.
- **DELETE `/officer/:officerID`**: Deletes an officer by ID.

#### **Employees**
- **GET `/faculty/`**: Fetches all employees.
- **POST `/students/add-employee`**: Adds a new employee.
  **Request Body Example**:
  ```json
    {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "position": "Dean",
    "image": { "file upload" }
    }
- **PUT `/faculty/:employeeID`**: Updates an employee by ID.
- **DELETE `/faculty/:employeeID`**: Deletes an employee by ID.

## Database Structure

### **Student Table**

| Field       | Type     | Description                    |
|-------------|----------|--------------------------------|
| studentID   | INT      | Primary Key                    |
| firstName   | VARCHAR  | Student's first name           |
| lastName    | VARCHAR  | Student's last name            |
| email       | VARCHAR  | Email address                  |
| year        | ENUM     | Year Level                     |
| section     | ENUM     | Section                        |
| birthday    | DATE     | Student’s birthday             |

### **Officers Table**

| Field       | Type     | Description                    |
|-------------|----------|--------------------------------|
| officerID   | INT      | Primary Key                    |
| firstName   | VARCHAR  | Officer's first name           |
| lastName    | VARCHAR  | Officer's last name            |
| email       | VARCHAR  | Email address                  |
| year        | ENUM     | Year Level                     |
| section     | ENUM     | Section                        |
| birthday    | VARCHAR  | Officer’s birthday             |
| role        | VARCHAR  | Officer’s role                 |
| imageName   | VARCHAR  | Image Name                     |

### **Employees Table**

| Field       | Type     | Description                    |
|-------------|----------|--------------------------------|
| employeeID  | INT      | Primary Key                    |
| firstName   | VARCHAR  | Employee's first name          |
| lastName    | VARCHAR  | Employee's last name           |
| email       | VARCHAR  | Email address                  |
| position    | VARCHAR  | Employee position              |
| imageName   | VARCHAR  | Image Name                     |

---

## Frontend Documentation

### 1. Setup

Follow the steps below to set up the project:

1. Clone or download the repository.
2. Navigate to the `backend` folder.
3. Execute the provided SQL commands in your MySQL command line or a database management tool to populate the database with the necessary data (this step is required if you haven't already populated the database from the backend).
4. Open any of the HTML files to view the site.
5. Feel free to explore and edit the site to your preference!
