Деплой тут: https://goit-node-rest-api-3zni.onrender.com/api
https://tasks-rest-api-8u4m.onrender.com

Users:
1/
POST http://localhost:port/api/users/register
body: 
{
  "name": "User Name",
  "email": "111111@111111.net",
  "password": "111111"
}

responce:
{
  token: "",
  user:{}
}

2/
POST http://localhost:port/api/users/login

body: 
{
  "email": "111111@111111.net",
  "password": "111111"
}

responce:
{
  token: "",
  user:{}
}

3/
POST http://localhost:port/api/users/logout
Headers
Authorization: "Bearer token"

4/ 
GET http://localhost:port/api/users/current

Headers
Authorization: "Bearer token"

responce:

user:{}


6/ 
PATCH http://localhost:port/api/users/avatars
Headers
Authorization: "Bearer token"
Content-Type: multipart/form-data
RequestBody: файл

// for frontend - https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
responce 
avatarUrl

/7 
GET http://localhost:port/api/users/verify/:verificationToken
//for verification email 

8/
POST http://localhost:port/api/users/verify

//for reVerification email 
body: 
{
  "email": "111111@111111.net"  
}

9/
PATCH 
http://localhost:port/api/users

body: 
{
  "name": "New Name"
  "email": "new email",
  "password": "new password"
}


BOARDS:

1/ 
GET http://localhost:port/api/boards

Header
Authorization: "Bearer token"

response data: [] - boards

2/
GET http://localhost:port/api/boards/:id

Header
Authorization: "Bearer token"

3/
POST http://localhost:port/api/boards

Header
Authorization: "Bearer token"

Body
{
  "title": "title board",  
  "baclground": "Url", // File  
}

4/
GET http://localhost:port/api/boards/:id

Header
Authorization: "Bearer token"

5/
PATCH http://localhost:port/api/boards/:id

Header
Authorization: "Bearer token"
Body
{    
  "title": "new Title",  
  "baclground": "Url", // File
}

6/ 
DELETE http://localhost:port/api/boards/:id
Headers
Authorization: "Bearer token"


THEMES:

get: http://localhost:8080/api/themes


TASKS:

1/ 
GET http://localhost:port/api/tasks

Header
Authorization: "Bearer token"

response data: [] - boards

2/
GET http://localhost:port/api/tasks/:id

Header
Authorization: "Bearer token"

3/
POST http://localhost:port/api/tasks

Header
Authorization: "Bearer token"

Body
{
  "title": "title board",  
  "baclground": "Url", // File  
}

4/
GET http://localhost:port/api/tasks/:id

Header
Authorization: "Bearer token"

5/
PATCH http://localhost:port/api/tasks/:id

Header
Authorization: "Bearer token"
Body
{    
  "title": "new Title",  
  "baclground": "Url", // File
}

6/ 
DELETE http://localhost:port/api/tasks/:id
Headers
Authorization: "Bearer token"


{
 "name": "qqqqqq",
 "email": "qqq@qqq.com",
 "password": "qqqqqq"
}