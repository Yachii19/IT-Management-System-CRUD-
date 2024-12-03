CREATE TABLE students ( 
    studentID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    year ENUM('1', '2', '3', '4') NOT NULL, 
    section ENUM('A', 'B', 'C', 'D') NOT NULL, 
    birthday VARCHAR(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE officers ( 
    officerID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    year ENUM('1', '2', '3', '4') NOT NULL, 
    section ENUM('A', 'B', 'C', 'D') NOT NULL, 
    birthday VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    imageName VARCHAR(255)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE employees ( 
    employeeID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    position VARCHAR(50) NOT NULL,
    imageName VARCHAR(255)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;