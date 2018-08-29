# API Documentation

## Things to consider
* An upvotes table to keep track of user upvotes
    * Useful to prevent a single user upvoting multiple times
* Should universities have data
    * Flavour text ect.
    * Some kind of reuptation or something?

## Identifying Data Types
* Users
* Universities
* Courses
* Questions
* Answers (Replies to Questions)
* Reviews
* Replies (Replies to Reviews)

## Sample Schema's (json)

### User
```
"user": {
    "id": <id>
    "username": <unqiue string>
    "password": <string> // NOT SENT THROUGH API (db/schema)
    "email": <unqiue string> // NOT SENT THROUGH API (db/schema)
    "meta": {
        "reputation": <number> // Merge meta/profile?
    }
    "img_url": <string>
}
```

### University
```
"university" {
    "id": <id>
    "name": <string>
    "img_url": <string>
}
```

### Course
```
"course": {
    "id": <id>
    "meta": {
        "reputation/rating": <number>
        "num_questions": <number>
        "num_reviews": <number>
    }
    "code": <string> // e.g. COMP4920
    "name": <string> // e.g. Ethics and Project Management
    "parent": <key> // e.g. UNSW
    "faculty/facult_code": e.g. "COMP" // Allows refined search
    "children": [Post] // The first page of children
}
```

### Post (Questions/Review)
```
"post": {
    "id": <id>
    "meta": {
        "uid": <key>
        "parent": <key>
        "upvotes" <number>
        "num_children": <number>
    }
    "children": [Comment] // The first page of children
    "title": <string>
    "body": <string>
}
```

### Comment (Answers/Replies)
```
"comment": {
    "id": <id>
    "meta": {
        "uid": <key>
        "parent": <key>
        "upvotes" <number>
    }
    "title": <string>
    "body": <string>
}
```

## Sample API Routes

### Users
Get the data for a specific user
* /api/user/:id

### Universities

Get ALL universtiies
* /api/uni

Get data for a specific university
* /api/uni/:id

REDACTED: Get ALL courses for a university
* /api/uni/:uid/courses

Get page (N) courses for a university
* /api/uni/:uid/courses?p=N
* Top/Popular courses

Get courses for a specific faulty
* /api/uni/:uid:/courses?faculty=COMP

Get courses for a specific session
* /api/uni/:uid:/courses?session=18s2
* Sessions: s1, s2, (s3 for trimesters?)

### Courses

Get the course data for a specific course id
* /api/course/:cid

REDACTED: Get ALL questions for a course
* /api/course/:cid/questions

Get page (N) questions for a course
* /api/course/:cid/questions?p=N

REDACTED: Get ALL reviews for a course
* /api/course/:cid/reviews

Get page (N) questions for a course
* /api/course/:cid/reviews?p=N

### Questions

Get the question data for a specific question id
* /api/course/:cid/question/:qid

REDACTED: Get ALL answers for a question
* /api/course/:cid/question/:qid/answers

Get page (N) answers for a question
* /api/course/:cid/questions/:qid/answers?p=N

### Answers (Do we ever need to get an answer directly)

* Refer to Questions

### Reviews

Get the review data for a specific review id
* /api/course/:cid/review/:rid

REDACTED: Get ALL replies for a review
* /api/course/:cid/review/:rid/replies

Get page (N) replies for a review
* /api/course/:cid/review/:rid/replies?p=N

### Replies (Do we ever need to get a reply directly)

* Refer to Reviews

# Sample Front End Data Requests

## Rendering Course Page Questions
1. Get course id based on course code:
    * /courses/:course_code
        * Variables:
            * course_code - user specified e.g. COMP4920
        * Returns:
            * course_id: 13141
            * course_code: COMP4920
            * course_name: Ethics and Management
        * Backend query:
            * (SELECT course_id FROM courses WHERE code=?, course_code)
2. Using the id get the question ids and questions:
    * /courses/:course_id/questions
        * Variables:
            * course_code - user specified e.g. COMP4920
            * course_id - obtained from step 1.
        * Returns:
            * questions: mapping of question_id to question
        * Backend query:
            * (SELECT q_id, question FROM questions WHERE course_id=?, course_id)

## Rendering Individual Questions and Answers
1. Get the question
    * /questions/:question_id
        * Variables:
            * question_id: /courses/:course_id/questions.
        * Returns:
            * mapping of question_id to question_data
                * question_data = question, upvote_count, etc.
        * Backend query:
            * (SELECT * FROM questions WHERE q_id=?, question_id)


2. Get the answers:
    * /questions/:question_id/answers
        * Variables:
            * question_id: /courses/:course_id/questions (already have)
        * Returns:
            * mapping of answer_id to answer_data_data.
                * answer_data = answer, upvote_count, etc.
        * Backend query:
            * (SELECT * FROM answers WHERE q_id=?, question_id)

## Rendering Course Reviews
See above...