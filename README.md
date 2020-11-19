# Back-End for Anywhere Fitness
By Tzong-Lian Tsay   
Nov 16-20, 2020

**API: https://back-end-active-fitness.herokuapp.com/api**    

### **_Endpoints for Classes_**
| Method | Endpoint | Request Body | Token Type | JSON Response |
| ------ | -------- | ---- | ---- | ----|
| GET - fetch all classes | /classes | N/A | N/A | Array of Class Objects |
| GET - fetch a class by ID | /classes/:id | N/A | N/A | Class Object |
| GET - fetch all students by class's ID | /classes/:id/students | N/A | Admin or Instructor*| Array of Student Objects |
| POST - a student to a class ID | /classes/:id/students | { student_id: integer } | Admin or Student* | < Success Message > |
| PUT - edit a class | /classes/:id |  { class_name: string ,</br> class_type: string,</br> class_start: string,</br> class_duration: integer,</br> class_intensity: string,</br> class_location: string,</br> class_maxStudents: integer } | Admin or Instructor* | < Success Message > |
| DELETE - delete a class | /classes/:id | N/A | Admin or Instructor* | < Success Message > |
| DELETE - delete a student from a class | /classes/:id/students | {student_id: integer} | Admin or Student* | < Success Message > |

### **_Endpoints for Students_**
| Method | Endpoint | Request Body | Token Type | JSON Response |
| ------ | -------- | ---- | ---- | ---- |
| GET - fetch all students | /students | N/A | Admin* | Array of Student Objects |
| GET - fetch a student by ID | /students/:id | N/A | Admin or Student* | Student Object |
| GET - fetch a student's classes | /students/:id/classes| N/A | Admin or Student* | Array of Class Objects |
| POST - Login | /students/login | { student_email: string,</br> student_password: string } | N/A |{ < Success Message >, </br> student_id: integer,</br> token: string } |
| POST - add a student | /students/new | { student_email: string (unique),</br> student_name: string,</br> student_password: string } | N/A | < Success Message > |
| PUT - edit a student | /students/:id | { student_email: string (unique),</br> student_name: string,</br> student_password: string } | Admin or Student* | < Success Message > |
| DELETE - delete a student | /students/:id | N/A | < Success Message > |

### **_Endpoints for the Instructors_**
| Method | Endpoint | Request Body | Token Type | JSON Response |
| ------ | -------- | ---- | ---- | ---- |
| GET - fetch all instructors | /instructors | N/A | N/A | Array of Instructor Objects |
| GET - fetch an instructor by ID | /instructors/:id | N/A | N/A | Instructor Object |
| GET - fetch all classes by instructor's ID | /instructors/:id/classes | N/A | N/A | Array of Class Objects |
| POST - Login | /instructors/login | { instructor_email: string,</br> instructor_password: string }| N/A | { < Success Message >, </br> instructor_id: integer,</br> token: string } |
| POST - add an instructor | /instructors/new | { instructor_email: string (unique),</br> instructor_name: string,</br> instructor_password: string } | N/A | < Success Message > |
| POST - a new class by instructor's ID | /instructors/:id/classes/new | { class_name: string ,</br> class_type: string,</br> class_start: string,</br> class_duration: integer,</br> class_intensity: string,</br> class_location: string,</br> class_maxStudents: integer }| Admin or Instructor* | < Success Message > |
| PUT - edit an instructor | /instructors/:id | { instructor_email: string (unique),</br> instructor_name: string,</br> instructor_password: string } | Admin or Instructor* | < Success Message > |
| DELETE - delete an instructor | /instructors/:id | N/A | Admin or Instructor* | < Success Message > |    

#### Notes
\* - Currently all registered users can make all requests.  Future update will check tokens for Admin user or Student/Instructor ID owner.
   
Example Student Login:
{ "student_email": "homer@springfield.com", "student_password": "Donuts123"}    
    
Example Instructor Login:
{ "student_email": "mario@mushroomkingdom.com", "student_password": "Luigi123"}

