
# Smart Course Project Plan

A web application that allows university students and lecturers to communicate information about courses they are involved in.

## Course Questions & Answers [EPIC, THEME]
Students and teachers should be able to share information about a course.

### Ask Questions
A student should be able to ask questions about a course they are interested in.

### Answer/Comment on Questions
A student or lecturer should be able to answer a question previously posted about a course.

### Upvoting
As a user I want to express the usefulness or relevance of a question or answer by upvoting it.

### Accepted answer
As a user I want to quickly see the most relevant or upvoted answer for a given question.

### Question priority
As a question answerer I want to quickly see the most relevant or popular questions.

### Answerer Reputation
As a reliable contributer I want my answers to be given more weight.

### Answerer verification
As someone looking at the answer/s to a question, I want to see which answerers are teachers (lecturers, TAs) for the course and which answerers have done the course (or are currently doing it).

## Infrastructure & Performance [EPIC, THEME]
A user should be able to expect to be able to access the application from outside a development environment.

### Tech Stack
A developer needs to decide on and build a technology stack that makes sense given the scope of the project.

### Domain Name
A user should be able to access the application from a persistent URL.

### Remote Hosting
A user should be able to access the application from a remote hosting service or with dedicated server infrastructure.

### Deployment
A developer should be able to deploy updates to the application remotely.

## Identity & Authentication System [EPIC, THEME]
Users should be able to expect some sense of identification and authentication.

### Site visitor
As visitor without an account, I want to be able to view most of the site content, including search

### Anonymous Questions
As visitor without an account, I want to be able to ask questions so I don't have to create an account

### Account Creation
A student should be able to create an account with a university email address.
An enterprise customer should be able to request an enterprise account with a univerity application form.

### Login/out
A student should be able to log in and log out of their account

### Password Recovery
A student should be able to retrieve their password

## Design & User Experience [EPIC, THEME]
The application should make it easy for users to find what they are looking for and view it in a clear and easy fashion.

### Site Template
The user should be able to use a consistent format for navigating the site.

### Devices/Viewport
A user should be able to access the web application from a variety of devices.

### Accessibility 
A user should be able to expect a w3c compliant website, that abides by ARIA.

## Documentation, Licensing, Code of Conduct/Terms & Conditions, & EULA [EPIC, THEME]
The application should provide adequate documentation and compliance 
to make it clear both how the application is used, the terms of service and 
behaviour, and any licensing or attribution requirements.

### Documentation
A user should expect basic readme, usage documentation that they can refer to if they need to.

### Licensing & Attribution
A developer should take appropriate steps to comply with licensing of software and relevant attribution of assets.

### EULA & T&Cs
A user should know the behaviour that is expected of them in using the software.

## User Profiles [EPIC, THEME]
A user should be able to setup a custom profile for a tailored user experience.

### Profile page
A user should be able to set up a personal profile page that contains personal information for community interaction.

### Home page / Feed
A user should be presented with application contents that might be of interest to them based on their profile.

## Moderation, Privacy & Safety [EPIC, THEME]
A user should be able to expect a certain degree of quality about both the responses being made and safety against, harsh, unfair, or unwarranted critique.

### Report System
A user should be able to moderate content by reporting offensive, inappropriate or defamatory material.

### Moderators
Some users should be moderators, and have the power to delete offensive posts, remove irrelevant discussion etc.

### Privacy
A user should have the right to display as little information as is required, a user should be able to delete their data if desired.

## Enterprise API [EPIC, THEME]
An enterprise user should be able to get specific bespoke data from the application.

### API Endpoints
An enterprise user should be able to request specific information from a defined endpoint.

### Integrations
A user should be able to integrate their applications with the API -- potentially feed back data to the application too.

## Course Reviews & Profiles [EPIC, THEME]
A user should be able to get a general idea about past course experiences.

### Add a Review
A user should be able to review a course they have previously taken.

### Comment on a Review
A user should be able to comment on a review for further discussion.

### Upvote a Review
A user should be able to upvote a review.

## Data Organisation [EPIC, THEME]

### Searching (Data grouped by session, course, uni)

* As a student I want to be able to search for a course by course code/course name.
* As a student I want to be able to refine my search by selecting to display only courses from a particular university.
* As a student I want to refine my search by selecting to display only courses running in a particular session.

Moderation features - delete stuff, merge questions, report
Course profile features questions, feedback/attributes

### Feedback/rating/review system separate from questions
* As a student I want to be able to submit a review of a course so that I can provide public feedback about the course that can be viewed by others.
* As a student I want to be able to read reviews about a course so that I can get an understanding of how others percieved the course.
* As a student I want to be able to rate reviews positively/negatively in accordance to whether I found them accurate and helpful.