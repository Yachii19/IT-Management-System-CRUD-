import { setupAddOfficer, setupAddStudent, setupAddEmployee } from "./addOperations.js";
import { setUpOfficerUpdate, setUpStudentUpdate, setUpEmployeeUpdate } from "./updateOperations.js";


// GET STUDENTS
export function displayStudents(data) {
    const table = document.querySelector('#students_table');
    let tableHTML = `        
            <div class="table-header">
                <p>Student Name</p>
                <p>Email</p>
                <p>Year and Section</p>
                <p>Birthday</p>
            </div>
        `;  

    if (Array.isArray(data) && data.length > 0) {
        data.forEach((student) => {
            tableHTML += `
               <div class="table-content">
                <p>${student.firstName} ${student.lastName}</p>
                <p>${student.email}</p>
                <p>BSIT - ${student.year}${student.section}</p>
                <p>${student.birthday}</p>
                <div class="update-container" data-id="${student.studentID}">
                    <img src="./assets/images/write.png" alt="">
                </div>
                <div class="delete-container" data-id=${student.studentID}>
                    <img src="./assets/images/trash.png" alt="">
                </div>
            </div>
            `;
        });
    } else {
        tableHTML = `
            <div class="no-student-warning">
                <img src="./assets/images/warning.png" alt="">
                <p>No student found!</p>
            </div>
        `;
    }

    table.innerHTML = tableHTML;
    setupAddStudent();
    setUpStudentUpdate();
}

export async function getStudents() {
    try {
        const res = await fetch('http://localhost:4000/students', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch students');
        const data = await res.json();
        displayStudents(data.data); // Pass data to the display function
    } catch (err) {
        console.error("Error fetching students:", err.message);
    }
};


export function displayOfficers(data) {
    const officers = document.querySelector('#officer_list');
    let officerHTML = ``;  
  

    if (Array.isArray(data) && data.length > 0) {
        data.forEach((officer) => {
            officerHTML += `
               <div class="officer-container">
                    <div class="officer">
                        <div class="image-background">
                            <img src="./assets/images/IT Background Design.png" alt="">
                        </div>
                        <div class="officer-image-container">
                            <img src="./assets/images/uploads/${officer.imageName}" alt="">
                        </div>
                        <div class="officer-info">
                            <p class="officer-name">${officer.firstName} ${officer.lastName}</p>
                            <p class="officer-section">BSIT - ${officer.year}${officer.section}</p>
                            <p class="officer-position">${officer.role}</p>
                        </div>
                    </div>
                    <div class="buttons-container">
                        <button class="update" id="update_officer" data-id="${officer.officerID}">Update</button>
                        <button class="delete" id="delete_officer" data-id="${officer.officerID}">Delete</button>
                    </div>
                </div>
            `
        });
    } else {
        officerHTML = `
            <div class="no-officer-warning">
                <img src="./assets/images/warning.png" alt="">
                <p>No Officer found!</p>
            </div>
        `;
    }
    
    officerHTML += 
    `<div class="add-officer-continer" >
        <div class="add-officer" id="add_officer">
            <div class="add-img-container" >
                <img src="./assets/images/add-icon.png" alt="">
            </div>
            <p>Add Officer</p>
        </div>
    </div>`

    
    officers.innerHTML = officerHTML;
    setupAddOfficer();
    setUpOfficerUpdate();
}

export async function getOfficers() {
    try {
        const res = await fetch('http://localhost:4000/officers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch officer');
        const data = await res.json();
        displayOfficers(data.data); // Pass data to the display function
    } catch (err) {
        console.error("Error fetching Officers:", err.message);
    }
};



export function displayEmployees(data) {
    const employees = document.querySelector('#employee_list');
    let employeeHTML = ``;  
  

    if (Array.isArray(data) && data.length > 0) {
        data.forEach((employee) => {
            employeeHTML += `
               <div class="employee-container">
                    <div class="employee">
                        <div class="image-background">
                            <img src="./assets/images/IT Background Design 2.png" alt="">
                        </div>
                        <div class="employee-image-container">
                            <img src="./assets/images/uploads/${employee.imageName}" alt="">
                        </div>
                        <div class="employee-info">
                            <p class="employee-name">${employee.firstName} ${employee.lastName}</p>
                            <p class="employee-position">${employee.position}</p>
                        </div>
                    </div>
                     <div class="buttons-container">
                        <button class="update" id="update_employee" data-id="${employee.employeeID}">Update</button>
                        <button class="delete" id="delete_employee" data-id="${employee.employeeID}">Delete</button>
                    </div>
                </div>
            `
        });
    } else {
        employeeHTML = `
            <div class="no-employee-warning">
                <img src="./assets/images/warning.png" alt="">
                <p>No Employee found!</p>
            </div>
        `;
    }
    
    employeeHTML += 
    `<div class="add-employee-container" >
        <div class="add-employee" id="add_employee">
            <div class="add-img-container" >
                <img src="./assets/images/add-icon.png" alt="">
            </div>
            <p>Add Employee</p>
        </div>
    </div>`

    
    employees.innerHTML = employeeHTML;
    setupAddEmployee();
    setUpEmployeeUpdate();
}

export async function getEmployees() {
    try {
        const res = await fetch('http://localhost:4000/faculty', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch employees');
        const data = await res.json();
        displayEmployees(data.data); // Pass data to the display function
    } catch (err) {
        console.error("Error fetching Officers:", err.message);
    }
};