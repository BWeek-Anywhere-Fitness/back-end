# Back-End for Anywhere Fitness
By Tzong-Lian Tsay

API: https://back-end-active-fitness.herokuapp.com/api/

### **_Endpoints for the Guests_**

| Method | Endpoint | Request Body | Notes |
| ------ | -------- | ---- | ----- |
| GET - all classes | /classes | (N/A) | Fetches all classes. |
| GET - a class by ID | /classes/:id| (N/A) | Fetch a class by ID. |
No token needed for guests.

### **_Endpoints for the Instructors_**

| Method | Endpoint | Request Body | Notes |
| ------ | -------- | ---- | ----- |
| GET - all students | /students | (N/A) | Fetches all students. |
| GET - a student by ID | /students/:id | (N/A) | Fetches a student by ID. |
| POST - add a student | /students/new | { student_name, student_email, student_password} | Adds a new student profile. |
| PUT - edit a student | /students/:id | { student_name, student_email, student_password} | Edits a student's profile. |
| DELETE - delete a student | /students/:id | (N/A) | Deletes a student's profile. |
All student endpoints require a token.

### **_Endpoints for the Instructors_**

| Method | Endpoint | Request Body | Notes |
| ------ | -------- | ---- | ----- |
| GET - all instructors | /instructors | (N/A) | Fetches all instructors. |
| GET - an instructor by ID | /instructors/:id | (N/A) | Fetches an instructor by ID. |
| POST - add an instructor | /instructors/new | { instructor_name, instructor_email, instructor_password} | Adds a new instructor profile. |
| POST - a new class by instructor | /instructors/:id/classes/new | {class_name, class_type, class_start, class_duration, class_intensity, class_maxStudents | Adds a new class for this instructor |
| PUT - edit an instructor | /instructors/:id | { instructor_name, instructor_email, instructor_password} | Edits a instructor's profile. |
| DELETE - delete an instructor | /instructors/:id | (N/A) | Deletes an instructor's profile. |
All instructor endpoints require a token.

Missing: Edit a class, delete a class, 

