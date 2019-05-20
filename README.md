# Bountiful Children's Foundation - Backend

API for Bountiful Children's Foundation. 
__URL__: https://bcf-backend.herokuapp.com

- [Users](#users)

  - [Register a new user](#register-a-new-user)
  - [Login a user](#login-a-user)
  - [Get a user by ID](<#get-a-user-by-ID-(includes-their-stories)>)

- [Stories](#stories)
  - [Get all stories](#get-all-stories)
  - [Get story by ID](#get-story-by-id)
  - [Add a story](#add-a-story)
  - [Update a story](#update-a-story)
  - [Delete a story](#delete-a-story)

# Users

## Register a new user

POST https://bcf-backend.herokuapp.com/users/register

### Parameters (Make sure to match case)

| Name      | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| firstname | string | user's first name               |
| lastname  | string | user's last name                |
| country   | string | user's country                  |
| title     | string | either "Coordinator" or "Donor" |
| email     | string | user's email address            |
| username  | string | user's username                 |
| password  | string | user's password                 |

### Examples

```

axios.post("https://bcf-backend.herokuapp.com/users/register", {
    "firstname": "Jane",
    "lastname": "Doe",
    "country": "Peru",
    "title": "Coordinator",
    "email": "jane@company.com",
    "username": "janedoe",
    "password": "janedoe"
})

axios.post("https://bcf-backend.herokuapp.com/users/register", {
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

POST https://bcf-backend.herokuapp.com/users/login

### Parameters (Make sure to match case)

| Name     | Type   | Description     |
| -------- | ------ | --------------- |
| username | string | user's username |
| password | string | user's password |

### Examples

```

axios.post("https://bcf-backend.herokuapp.com/users/login", {
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

Login Error:

```

ERROR XXX
{
    "error": "Some Error Message"
}

```

## Get a user by ID (includes their stories)

GET https://bcf-backend.herokuapp.com/users/:id

### **NOTE: Token is needed for authorization to endpoint**

### Parameters (Make sure to match case)

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | number | user's ID   |

### Examples

```

axios.get("https://bcf-backend.herokuapp.com/users/1")


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

# Stories

### **NOTE: All requests to /stories endpoint requires token**

## Get All Stories

GET https://bcf-backend.herokuapp.com/stories

### Example

```

 axios.get("https://bcf-backend.herokuapp.com/stories");

```

### Success Response

Stories Data

```

[
  {
    "id": 1,
    "user_id": 1,
    "title": "A Moment in Peru",
    "country": "Peru",
    "description": "A cool story that happened in Peru",
    "fullStory": "Full story goes here.",
    "date": "May 17, 2019"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "A Tour in Ghana",
    "country": "Ghana",
    "description": "A cool story that happened in Ghana",
    "fullStory": "Full story goes here.",
    "date": "May 17, 2019"
  },
  {
    "id": 3,
    "user_id": 1,
    "title": "A Day in Cambodia",
    "country": "Cambodia",
    "description": "A cool story that happened in Cambodia",
    "fullStory": "Full story goes here.",
    "date": "May 17, 2019"
  },
  {
    "id": 4,
    "user_id": 2,
    "title": "A Life in Haiti",
    "country": "Haiti",
    "description": "A cool story that happened in Haiti",
    "fullStory": "Full story goes here.",
    "date": "May 17, 2019"
  },...
 ]

```

### Error Response

```

ERROR XXX
{
    "error": "Some Error Message"
}

```

## Get Story by ID

GET https://bcf-backend.herokuapp.com/stories/:id

### Example

```

 axios.get("https://bcf-backend.herokuapp.com/stories/3");

```

### Parameters (Make sure to match case)

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| id            | integer | story's ID         |

### Success Response

Story Data

```

{
  "id": 3,
  "user_id": 1,
  "title": "A Day in Cambodia",
  "country": "Cambodia",
  "description": "A cool story that happened in Cambodia",
  "fullStory": "Full story goes here.",
  "date": "May 17, 2019",
  "created_at": "2019-05-18 19:00:19",
  "updated_at": "2019-05-18 19:00:19"
}

```

### Error Response

```

ERROR XXX
{
    "error": "Some Error Message"
}

```

## Add a story

POST https://bcf-backend.herokuapp.com/stories


### Parameters (Make sure to match case)

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| user_id       | integer | user's ID          |
| title         | string  | title of story     |
| country       | string  | country of story   |
| description   | string  | preview of story   |
| fullStory     | string  | the full story     |
| date          | string  | date of story      |


### Example

```

 axios.post("https://bcf-backend.herokuapp.com/stories", {
    "user_id": 1,
    "title": "The Grand Zimbabwe",
    "country": "Zimbabwe",
    "description": "Preview of cool story",
    "fullStory": "Full story about Zimbabwe",
    "date": "May 18, 2019"
 });

```

### Success Response

Story Data

```

{
  "id": 7,
  "user_id": 1,
  "title": "The Grand Zimbabwe",
  "country": "Zimbabwe",
  "description": "Preview of cool story",
  "fullStory": "Full story about Zimbabwe",
  "date": "May 18, 2019",
  "created_at": "2019-05-18 23:04:15",
  "updated_at": "2019-05-18 23:04:15"
}

```

### Error Response

```

ERROR XXX
{
    "error": "Some Error Message"
}

```


## Update a story

PUT https://bcf-backend.herokuapp.com/stories/:id


### Parameters (Make sure to match case)

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| id            | integer | story's ID          |
| user_id       | integer | user's ID          |
| title         | string  | title of story     |
| country       | string  | country of story   |
| description   | string  | preview of story   |
| fullStory     | string  | the full story     |
| date          | string  | date of story      |


### Example

```

 axios.put("https://bcf-backend.herokuapp.com/stories/7", {
    "user_id": 1,
    "title": "The VERY Grand Zimbabwe",
    "country": "Zimbabwe",
    "description": "Preview of cool story",
    "fullStory": "Full story about Zimbabwe",
    "date": "May 18, 2019"
 });

```

### Success Response

```

{
  "message": "1 story updated!"
}

```

### Error Response

```

ERROR XXX
{
    "error": "Some Error Message"
}

```

## Delete a story

DELETE https://bcf-backend.herokuapp.com/stories/:id


### Parameters (Make sure to match case)

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| id            | integer | story's ID         |



### Example

```

 axios.delete("https://bcf-backend.herokuapp.com/stories/7");

```

### Success Response


```

{
  "message": "1 story deleted!"
}

```

### Error Response

```

ERROR XXX
{
    "error": "Some Error Message"
}

```