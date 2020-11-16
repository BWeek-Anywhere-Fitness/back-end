# Back-End for Anywhere Fitness
By Tzong-Lian Tsay

API: https://back-end-active-fitness.herokuapp.com/api/
Most endpoints require tokens, will note if not needed.

### **_Endpoints for the Users_**

| Method | Endpoint | Body | Notes |
| ------ | -------- | ---- | ----- |
| GET - all classes | /classes | (N/A) | Fetches all classes.  No token needed. |
| GET - a class by ID | /classes/:id| (N/A) | Fetch a class by ID. No token needed. |

| Method | Endpoint | Body | Notes |
| ------ | -------- | ---- | ----- |
| GET - all students | /students | (N/A) | Fetches all students. |
| GET - a student by ID | /students/:id | (N/A) | Fetches a student by ID. |
| POST - add a student | /students/new | { student_name, student_email, student_name} | Adds a new student profile. |

| Method | Endpoint | Body | Notes |
| ------ | -------- | ---- | ----- |
| GET - all instructors | /instructors | (N/A) | Fetches all instructors. |
| GET - an instructor by ID | /instructor/:id | (N/A) | Fetches an instructor by ID. |
