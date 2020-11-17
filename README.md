# Back-End for Anywhere Fitness
By Tzong-Lian Tsay
Nov 16-20, 2020

API: https://back-end-active-fitness.herokuapp.com/api/

### **_Endpoints for Classes_**
No token required for /classes and /classes/:id
| Method | Endpoint | Request Body |
| ------ | -------- | ---- |
| GET - fetch all classes | /classes | N/A |
| GET - fetch a class by ID | /classes/:id | N/A |
| GET - fetch all students by class's ID | /classes/:id/students | N/A |
| PUT - edit a class | /classes/:id | < later > |
| DELETE - delete a class | /classes/:id | N/A |
Missing: POST for login with Auth. (Will attempt PassportJS+OAuth)

### **_Endpoints for Students_**
Future Update: All student endpoints require a token.
| Method | Endpoint | Request Body |
| ------ | -------- | ---- | 
| GET - fetch all students | /students | N/A |
| GET - fetch a student by ID | /students/:id | N/A |
| GET - fetch a student's classes | /students/:id/classes| N/A |
| POST - add a student | /students/new | { student_email: string (unique),</br> student_name: string,</br> student_password: string } | 
| PUT - edit a student | /students/:id | { student_email: string (unique),</br> student_name: string,</br> student_password: string } | 
| DELETE - delete a student | /students/:id | N/A | 
Missing: POST student to register a class

### **_Endpoints for the Instructors_**
Future Update: All instructor endpoints require a token.
| Method | Endpoint | Request Body | 
| ------ | -------- | ---- | 
| GET - fetch all instructors | /instructors | N/A |
| GET - fetch an instructor by ID | /instructors/:id | N/A |
| GET - fetch all classes by instructor's ID | /instructors/:id/classes | N/A | 
| POST - add an instructor | /instructors/new | { instructor_email: string (unique),</br> instructor_name: string,</br> instructor_password: string } |  
| POST - a new class by instructor's ID | /instructors/:id/classes/new | { class_name , class_type, class_start, class_duration, class_intensity, class_location, class_maxStudents }| 
| PUT - edit an instructor | /instructors/:id | { instructor_email: string (unique),</br> instructor_name: string,</br> instructor_password: string } | 
| DELETE - delete an instructor | /instructors/:id | N/A | 

