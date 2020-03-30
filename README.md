# FancyTodo-server
#### API DOCUMENTATION

###### Adhiawa Alif Archiafinno - FANCY TODO
**Show Todo**
----
  show all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "succes added new todo to todos list",
    "Todo": {
        "id": 3,
        "title": "learn REST",
        "description": "in Hacktiv* batch 4 MCC",
        "status": false,
        "due_date": "2021-03-01",
        "updatedAt": "2020-03-30T15:45:23.985Z",
        "createdAt": "2020-03-30T15:45:23.985Z"
    }
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`




  **Create Todo**
----
  Create a todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "message": "succes added new todo to todos list",
    "Todo": {
        "id": 3,
        "title": "learn REST",
        "description": "in Hacktiv* batch 4 MCC",
        "status": false,
        "due_date": "2021-03-01",
        "updatedAt": "2020-03-30T15:45:23.985Z",
        "createdAt": "2020-03-30T15:45:23.985Z"
    }
}`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ msg : "error on date" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`




    **Update Todo**
----
  Update a todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "successfully updated a todo in todos list",
    "Todo": {
        "id": 3,
        "title": "learn ENGLISH",
        "description": "in EF KOKAS",
        "status": false,
        "due_date": "2021-03-01",
        "updatedAt": "2020-03-30T15:45:23.985Z",
        "createdAt": "2020-03-30T15:45:23.985Z"
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "data not found" }`

  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ msg : "error on date" }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:** `{ msg : "Internal Server Error" }`




      **DELETE Todo**
----
  Delete a todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {
    "message": "successfully deleted todo from todos list",
    "Todo": {
        "id": 3,
        "title": "learn REST",
        "description": "in Hacktiv* batch 4 MCC",
        "status": false,
        "due_date": "2021-03-01",
        "createdAt": "2020-03-30T15:45:23.985Z",
        "updatedAt": "2020-03-30T15:45:23.985Z"
    }
}
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "data not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:** `{ msg : "Internal Server Error" }`



        **FIND Todo BY ID**
----
  find Todo by id.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {
    "message": "successfully deleted todo from todos list",
    "Todo": {
        "id": 3,
        "title": "learn REST",
        "description": "in Hacktiv* batch 4 MCC",
        "status": false,
        "due_date": "2021-03-01",
        "createdAt": "2020-03-30T15:45:23.985Z",
        "updatedAt": "2020-03-30T15:45:23.985Z"
    }
}
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "data not found" }`


