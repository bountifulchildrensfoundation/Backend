# Bountiful Children's Foundation - Backend
API for Bountiful Children's Foundation.

- [Users](#users)
    - [Register a new user](#register-a-new-user)
    - [Login a user](#login-a-user)
    - [Get a user by ID](#get-a-user-by-ID-(includes-user's-stories))


# Users
## Register a new user

POST http://localhost5000/users/register

### Parameters (Make sure to match case)

| Name        | Type      | Description   |
| ----------- | --------- | --------------  |
| firstname   | string    | user's first name |
| lastname    | string    | user's last name  |
| country     | string    | user's country |
| title       | string    | either "Coordinator" or "Donor"|
| email       | string    | user's email address |
| username    | string    | user's username |
| password    | string    | user's password|

### Examples 

```

axios.post("http://localhost5000/users/register", {
    "firstname": "Jane",
	"lastname": "Doe",
	"country": "Peru",
	"title": "Coordinator",
	"email": "jane@company.com",
	"username": "janedoe",
	"password": "janedoe"
})

axios.post("http://localhost5000/users/register", {
    "firstname": "Bill",
	"lastname": "Gates",
	"country": "Brazil",
	"title": "Donor",
	"email": "bill@company.com",
	"username": "billgates",
	"password": "billgates"
})

```

### Successful Response 
Successful Registration:
```

{
  "message": "Welcome Jane! Your username is janedoe.",
  "user": {
    "id": 1,
    "firstname": "Jane",
    "lastname": "Doe",
    "country": "Peru",
    "title": "Coordinator",
    "email": "jane@company.com",
    "username": "janedoe",
    "password": "$2a$14$YjkxrBK9pu01.L78SyB.wOeX9BNPn9dJbintMMvsTwLqCxNPlZ8sa"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImphbmVkb2UiLCJ0aXRsZSI6IkNvb3JkaW5hdG9yIiwiaWF0IjoxNTU4MjA4OTAzLCJleHAiOjE1NTg5Mjg5MDN9.TNdbditpT9iy7xfJFjJF5pjSApn2ybDtJg7oGmpcncI"
}

```

### Error Response
Registration Error:

```

ERROR XXX
{
    "error": "Some Error Message"
}

```


## Login a user

POST http://localhost5000/users/login

### Parameters (Make sure to match case)

| Name        | Type      | Description   |
| ----------- | --------- | ------------  |
| username    | string    | user's username |
| password    | string    | user's password|

### Examples 

```

axios.post("http://localhost5000/users/login", {
	"username": "janedoe",
	"password": "janedoe"
})


```

### Successful Response 
Successful Login:

```

{
  "message": "Welcome janedoe!",
  "user": {
    "id": 1,
    "firstname": "Jane",
    "lastname": "Doe",
    "country": "Peru",
    "title": "Coordinator",
    "email": "jane@company.com",
    "username": "janedoe",
    "password": "$2a$14$YjkxrBK9pu01.L78SyB.wOeX9BNPn9dJbintMMvsTwLqCxNPlZ8sa"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImphbmVkb2UiLCJ0aXRsZSI6IkNvb3JkaW5hdG9yIiwiaWF0IjoxNTU4MjA5MTMyLCJleHAiOjE1NTg5MjkxMzJ9.2Rbb_6EGDtvaNkZu50dOpcNJ5Kk4B_-R3w7OH8oC7yI"
}

```

### Error Response
Registration Error:

```

ERROR XXX
{
    "error": "Some Error Message"
}

```


## Get a user by ID (includes user's stories)

GET http://localhost5000/users/:id
### __Token is needed for authorization to endpoint__

### Parameters (Make sure to match case)

| Name        | Type      | Description   |
| ----------- | --------- | ------------  |
| id          | number    | user's ID |

### Examples 

```

axios.get("http://localhost5000/users/1")


```

### Successful Response 
User Data:

```

{
  "id": 1,
  "firstname": "Jane",
  "lastname": "Doe",
  "country": "Peru",
  "title": "Coordinator",
  "email": "jane@company.com",
  "username": "janedoe",
  "password": "$2a$14$YjkxrBK9pu01.L78SyB.wOeX9BNPn9dJbintMMvsTwLqCxNPlZ8sa",
  "stories": [
    {
      "id": 1,
      "title": "A Moment in Peru",
      "country": "Peru",
      "description": "Full story goes here.",
      "date": "May 17, 2019"
    },
    {
      "id": 2,
      "title": "A Tour in Ghana",
      "country": "Ghana",
      "description": "A cool story that happened in Ghana",
      "fullStory": "Full story goes here.",
      "date": "May 17, 2019"
    },
    {
      "id": 3,
      "title": "A Day in Cambodia",
      "country": "Cambodia",
      "description": "A cool story that happened in Cambodia",
      "fullStory": "Full story goes here",
      "date": "May 17, 2019"
    }
  ]
}

```

### Error Response

```

ERROR XXX
{
    "error": "Some Error Message"
}

```
