# SmartCourse (working title)
[![Build Status](https://travis-ci.com/SmartCourse/app.svg?branch=dev)](https://travis-ci.com/SmartCourse/app)
[![Coverage Status](https://coveralls.io/repos/github/SmartCourse/app/badge.svg?branch=dev&service=github)](https://coveralls.io/github/SmartCourse/app?branch=dev)

## Builds and Deployment
Our production build is automatically deployed when code is merged with master. The current production build can be found at: http://smartcourse.me/

Our staging build is automatically deployed when code is merged with dev. The current staging build can be found at: https://smartcourse-staging.azurewebsites.net/

## Draft Feature Plan
* Question answering ala stack overflow
    * post questions
    * answer questions
* Upvoting
    * upvoted answers, accepted answer
    * upvote questions
* Authentication system
    * Basic
    * Possibly anonymous/Temporary Account as well
* User System
    * user reputation/reliability - based on good questions asked/answered
* Data grouped by session, course, uni
* Moderation features - delete stuff, merge questions, report
* Course profile features questions, feedback/attributes
* Feedback/rating/review system separate from questions
    * Flag questions that should be part of course feedback
    * Template for review with various attributes - difficulty, workload, experience
    * Voting on reviews
* Data extraction for universities (ie an API maybe for university access?) - see course ratings, statistical stuff, anonymized comments
    * verified tutor/admin accounts (premium feature?)
