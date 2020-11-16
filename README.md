# back-end

### **_Endpoints for the Users_**

| Method                        | Endpoint                           | Body (required) | Body (optional) | Notes                                                            |
| ----------------------------- | ---------------------------------- | --------------- | --------------- | ---------------------------------------------------------------- |
| GET get classes              | /api/auth/users/classes            | N/A             | N/A             | Fetches all the classes from the database                        |
| get classes by Id GET         | /api/auth/users/classes/:id        | id              | N/A             | Fetches the class with given Id.                                 |
| get classes by Location GET   | /api/auth/users/classes/location   | location        | N/A             | Gets all the class in that location                              |
| get classes by intensity GET  | /api/auth/users/classes/intensity  | intensity       | N/A             | Gets all the class in that intensity. "low", "medium", or "high" |
| get classes by duration GET   | /api/auth/users/classes/duration   | duration        | N/A             | Gets all the class of that duration. Has to be double.           |
| get classes by type GET       | /api/auth/users/classes/type       | type            | N/A             | Gets all the class of that type.                                 |
| get classes by instructor GET | /api/auth/users/classes/instructor | instructor_name | N/A             | Gets all the class by that instructor.                           |
