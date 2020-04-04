# FancyTodo-server
#### API DOCUMENTATION

###### Adhiawa Alif Archiafinno - FANCY TODO

**USER**
-----

**Register**
----
  Registers new user

* **URL**

  /users/register

* **Method:**
  
  `POST`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
  `{ "email" : "john_doe@sample.com", "password" : "johndoe1" `
  **Required**
  - `email` : string
  - `password` : string


* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `{
        "id": 3,
        "email": "user2@mail.com",
        "token": "dsfhksdafljkashfjkshfihadsjk.sdfhasjfhdsjkfhjladshflaf.sjhfjashfjskahfkjdashfkjlas"
    }`
     

* **Error Responses:**

  * **Code:** 400 VALIDATION ERROR<br />
    **Content:**
    `{
    "errors": [
            {
                "message": "email must unique"
            }
        ]
    }`
    **OR**
   `{
    "errors": [
            {
                "message": "your email format is wrong"
            }
        ]
    }`




**Login**
----
  Login user

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Data Params**
`{ "email" : "john_doe@sample.com", "password" : "johndoe1" }`
  **Required**
  - `email` : string
  - `password` : string


* **Success Response:**

  * **Code:** 200 
    **Content:**
    `{
        "id": 3,
        "email": "user2@mail.com",
        "token": "dsfhksdafljkashfjkshfihadsjk.sdfhasjfhdsjkfhjladshflaf.sjhfjashfjskahfkjdashfkjlas"
    }`
    

* **Error Responses:**

  * **Code:**400 VALIDATION ERROR<br />
    **Content:**<br>
    `{
        "errors": [
            {
                "message": "Invalid email/password"
            }
        ]
    }`


  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:**<br>
    `{
        "errors": [
            {
                "message": "Internal server error"
            }
        ]
    }`


**Google Login**
----
  Login user using Google OAuth

* **URL**

  /users/googleLogin

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
  **Required**
  - GMail Username
  - GMail Password


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**<br>
    `{
        "id": 3,
        "email": "user2@gmail.com",
        "token": "dsfhksdafljkashfjkshfihadsjk.sdfhasjfhdsjkfhjladshflaf.sjhfjashfjskahfkjdashfkjlas"
    }`

* **Error Responses:**

  * **Code:**400 VALIDATION ERROR<br />
    **Content:**<br>
    `{
        "errors": [
            {
                "message": "Invalid email/password"
            }
        ]
    }`

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:**<br>
    `{
        "errors": [
            {
                "message": "Internal server error"
            }
        ]
    }`
     

**Show Todo**
----
  show all todos.

* **URL**

  /todos

* **Method:**

  `GET`

* **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "Todos": [
        {
            "id": 43,
            "title": "harry potter",
            "description": "in Gandaria City 21Cineplex with college friends",
            "status": false,
            "due_date": "2020-05-04",
            "UserId": 2,
            "createdAt": "2020-04-04T01:27:03.061Z",
            "updatedAt": "2020-04-04T01:27:03.061Z"
        },
        {
            "id": 45,
            "title": "godzilla",
            "description": "with ana, nina, and dinda",
            "status": false,
            "due_date": "2020-05-04",
            "UserId": 2,
            "createdAt": "2020-04-04T01:34:30.116Z",
            "updatedAt": "2020-04-04T01:34:30.116Z"
        }
    ]
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
  }`



**Create a todo**
----
  Create a new todo.

* **URL**

  /todos

* **Method:**

  `POST`

  * **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "message": "successfully added new todo to todos list",
    "Todo": {
        "id": 3,
        "title": "godzilla",
        "description": "with ambar, jidan, and rani at jidan's house. don't forget to bring popcorn!",
        "status": false,
        "due_date": "2021-03-01",
        "updatedAt": "2020-03-30T15:45:23.985Z",
        "createdAt": "2020-03-30T15:45:23.985Z"
    }
}`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{
        name: `SequelizeValidationError`,
        errors: [{ message: `Error on Validation`]
  }`

  OR

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
  }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
        name: `InternalServerError`,
        errors: [{ message: `Internal Server Error`]
  }`




**Update a todo**
----
  Update a todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`

* **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "successfully updated a todo in todos list",
    "Todo": {
        "id": 3,
        "title": "harry potter",
        "description": "with my college friends in nina's house",
        "status": false,
        "due_date": "2021-03-01",
        "updatedAt": "2020-03-30T15:45:23.985Z",
        "createdAt": "2020-03-30T15:45:23.985Z"
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
        name: `NotFound`,
        errors: [{ message: `there is no movie with this name`]
  }`

  OR

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
  }`

  OR

    * **Code:** 403 NOT FOUND <br />
    **Content:** `{
        name: `Unauthorized`,
        errors: [{ message: `User unauthorized` }]
  }`

  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{
        name: `SequelizeValidationError`,
        errors: [{ message: `Error on Validation`]
  }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:** `{
        name: `InternalServerError`,
        errors: [{ message: `Internal Server Error`]
  }`




 **DELETE Todo**     
----
  Delete a todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`

* **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "successfully deleted todo from todos list"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
        name: `NotFound`,
        errors: [{ message: `there is no movie with this name`]
  }`

  OR

    * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
  }`

  OR

    * **Code:** 403 NOT FOUND <br />
    **Content:** `{
        name: `Unauthorized`,
        errors: [{ message: `User unauthorized` }]
  }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:** `{
        name: `InternalServerError`,
        errors: [{ message: `Internal Server Error`]
  }`



 **FIND Todo BY ID**      
----
  find Todo by id.

* **URL**

  /todos/:id

* **Method:**

  `GET`

* **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "Todo": {
        "id": 66,
        "title": "doctor",
        "description": "bbb",
        "status": false,
        "due_date": "2020-05-04",
        "UserId": 2,
        "createdAt": "2020-04-04T09:57:39.636Z",
        "updatedAt": "2020-04-04T09:57:39.636Z"
    },
    "Movie_Description": {
        "Title": "Doctor Strange",
        "Year": "2016",
        "imdbID": "tt1211837",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX300.jpg"
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
        name: `NotFound`,
        errors: [{ message: `there is no movie with this name`]
  }`

    OR

      * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
  }`

  OR

    * **Code:** 403 NOT FOUND <br />
    **Content:** `{
        name: `Unauthorized`,
        errors: [{ message: `User unauthorized` }]
  }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:** `{
        name: `InternalServerError`,
        errors: [{ message: `Internal Server Error`]
  }`


