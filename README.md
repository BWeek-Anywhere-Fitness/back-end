# Back-End for Anywhere Fitness
By Tzong-Lian Tsay
Nov 16-20, 2020

API: https://back-end-active-fitness.herokuapp.com/api/

### **_Endpoints for Classes_**
No token required for /classes and /classes/:id
| Method | Endpoint | Request Body | Response |
| ------ | -------- | ---- | ---- |
| GET - fetch all classes | /classes | N/A | Array of Class Objects |
| GET - fetch a class by ID | /classes/:id | N/A | Class Object |
| GET - fetch all students by class's ID (instructor's authorization) | /classes/:id/students | N/A | Array of Student Objects |
| POST - a student to a class ID (student's authorization) | /classes/:id/students | { student_id: integer } | < Success Message > |
| PUT - edit a class (instructor's authorization) | /classes/:id | < later > | < Success Message > |
| DELETE - delete a class (instructor's authorization) | /classes/:id | N/A | < Success Message > |
| DELETE - delete a student from a class (student's authorization) | /classes/:id/students | {student_id: integer} | < Success Message > |

### **_Endpoints for Students_**
Future Update: All student endpoints require a token.
| Method | Endpoint | Request Body | Response |
| ------ | -------- | ---- | ---- |
| GET - fetch all students | /students | N/A | Array of Student Objects |
| GET - fetch a student by ID | /students/:id | N/A | Student Object |
| GET - fetch a student's classes | /students/:id/classes| N/A | Array of Class Objects |
| POST - Login | /students/login | { student_email: string,</br> student_password: string }| { < Success Message >, </br> student_id: integer,</br> token: string } |
| POST - add a student | /students/new | { student_email: string (unique),</br> student_name: string,</br> student_password: string } | < Success Message > |
| PUT - edit a student | /students/:id | { student_email: string (unique),</br> student_name: string,</br> student_password: string } | < Success Message > |
| DELETE - delete a student | /students/:id | N/A | < Success Message > |

### **_Endpoints for the Instructors_**
Future Update: All instructor endpoints require a token.
| Method | Endpoint | Request Body | 
| ------ | -------- | ---- | 
| GET - fetch all instructors | /instructors | N/A |
| GET - fetch an instructor by ID | /instructors/:id | N/A |
| GET - fetch all classes by instructor's ID | /instructors/:id/classes | N/A | 
| POST - Login | /instructors/login | { instructor_email: string,</br> instructor_password: string }|
| POST - add an instructor | /instructors/new | { instructor_email: string (unique),</br> instructor_name: string,</br> instructor_password: string } |  
| POST - a new class by instructor's ID | /instructors/:id/classes/new | { class_name , class_type, class_start, class_duration, class_intensity, class_location, class_maxStudents }| 
| PUT - edit an instructor | /instructors/:id | { instructor_email: string (unique),</br> instructor_name: string,</br> instructor_password: string } | 
| DELETE - delete an instructor | /instructors/:id | N/A | 

