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
    "uid": <unique int>
    "meta": {
        "reputation": <int> // Merge meta/profile?
    }
    "username": <unqiue string>
    "password": <string> // NOT SENT THROUGH API (db/schema)
    "email": <unqiue string> // NOT SENT THROUGH API (db/schema)
    "img_url" <string>
    "profile": {
        // Stuff for any profile data ect..
    }
}
```

### Universities
```
"university" {
    university_id: <unqiue int>
    "name": <string>
    "img_url" <string>
}
```

### Courses
```
"course": {
    "course_id": <unqiue int>
    "meta": {
        "reputation/rating": <number>
        "num_questions": <number>
        "num_reviews": <number>
    }
    "code": <string> // e.g. COMP4920
    "name": <string> // e.g. Ethics and Project Management
    "univserity_id": <key> // e.g. Searching for courses by uni
    "faculty/facult_code": e.g. "COMP" // Allows refined search
}
```

### Questions
```
"question": {
    "question_id": <unique int>
    "meta": {
        "user_id": <key>
        "course_id": <key>
        "upvotes" <number>
        "num_answers": <number> // Can be used to determine next answer id
    }
    "title": <string>
    "body": <string>
}
```

### Answers
```
"answer": {
    "answer_id": <unique int>
    "meta": {
        "user_id": <key>
        "question_id": <key>
        "upvotes" <number>
    }
    "title": <string>
    "body": <string>
}
```

### Reviews
```
"review": {
    "review_id": <unique int>
    "meta": {
        "user_id": <key>
        "course_id": <key>
        "upvotes" <number>
        "num_replies": <number> // Can be used to determine next reply id
    }
    "title": <string>
    "body": <string>
}
```

### Replies
```
"replies": {
    "reply_id": <unique int>
    "meta": {
        "user_id": <key>
        "review_id": <key>
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

Get data for a specific university
* /api/uni/:id

Get ALL courses for a university
* /api/uni/:uid/courses

Get (n) courses for a university
* /api/uni/:uid/courses?n=10
* Top/Popular courses

Get courses for a specific faulty
* /api/uni/:uid:/courses?faculty=COMP

Get courses for a specific session
* /api/uni/:uid:/courses?session=18s2
* Sessions: s1, s2, (s3 for trimesters?)

### Courses

Get the course data for a specific course id
* /api/course/:cid

Get ALL questions for a course
* /api/course/:cid/questions

Get (n) questions for a course
* /api/course/:cid/questions?n=10
* Top (n) questions ranked by reputation?

Get ALL reviews for a course
* /api/course/:cid/reviews

Get (n) questions for a course
* /api/course/:cid/reviews?n=10

### Questions

Get the question data for a specific question id
* /api/course/:cid/question/:qid

Get ALL answers for a question
* /api/course/:cid/question/:qid/answers

Get (n) answers for a question
* /api/course/:cid/questions/:qid/answers?n=10

### Answers (Do we ever need to get an answer directly)

* Refer to Questions

### Reviews

Get the review data for a specific review id
* /api/course/:cid/review/:rid

Get ALL answers for a question
* /api/course/:cid/review/:rid/answers

Get (n) answers for a question
* /api/course/:cid/review/:rid/answers?n=10

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