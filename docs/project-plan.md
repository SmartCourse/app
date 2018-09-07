
# Smart Course Project Plan

## Index
1. Problem Hypothesis
2. Product Value
3. Personas and Stakeholders
4. Value Stories
5. Releases
6. Roles
7. Sprints & Meeting Schedule
8. Technologies
9. Stories and Tasks in ZenHub

## 1.0 - Problem Hypothesis
University is full of hard work and tough challenges. Unfortunately, this experience is made more difficult without a centralised source for course information. The current solution that students have adopted is combining online spreadsheets, rare and vague university released evaluations and word of mouth.

## 2.0 - Product Value
'Smart Course' aims to solve the problem described above, by allowing
university students to evaluate, ask questions and share general information about university courses all year long. Whether it be in the midst of subject selection time, or the week before finals, the service is always available.

## 3.0 - Personas and Stakeholders

### Personas
* University Students - wants to learn more about courses.
* Course Administrators - wants to ensure there is no false information about courses.
* Teaching Assistants (TAs) - wants to provide answers about courses.
* Lecturers in Charge (LiCs) - wants to provide answers about courses.
* University Officials - wants to understand how students feel about courses.

### Stakeholders
In addition to the personas described above, the following people are stakeholders:
* Developers (Nuno, Alex, Travis and Luke)
* Client/Customer (Bruno)

## 4.0 - Value Stories

Priority levels:
* Must have - a necessity to make the specified release.
* Should have - an expectation to make the specified release.
* Like to have - a bonus to make the specified release. 

Releases (more detail in section 5):
* Minimum Viable Product (MVP)
* Final Product

*Note: Although specified in the user stories below, priority levels are subject to change.* 

### 4.1 Course Questions & Answers
Students and teachers should be able to share specific information about a course.

#### Ask Questions
As a student, I want to be able to ask a question about a course, so that I have access to information I didn't have previously.
 * Priority: Must Have
 * Release: MVP

#### Answer Questions
As a student or lecturer, I want to be able to answer questions posted about a course to help the learning community.
 * Priority: Must Have
 * Release: MVP

#### View Questions and Answers
As a student, I want to be able to view other people's questions and answers about a course, to resolve my own issues or to learn something new about a course I am interested in.
 * Priority: Must Have
 * Release: MVP

#### Upvoting Questions and Answers
As a student or lecturer, I want to express the usefulness or relevance of a question/answer by upvoting it.
 * Priority: Must Have
 * Release: Final Product

#### Accepted Answers
As a student, I want to quickly see moderator (lecturers, TAs) endorsed and highly upvoted answers to a given question, so I have some level of assurance.
 * Priority: Should Have
 * Release: Final Product

#### Question Priority
As a question answerer, I want to quickly see the most relevant and highly upvoted unanswered questions, to be able to promptly respond.
 * Priority: Should Have
 * Release: Final Product

#### User Reputation
As a reliable contributor, I want my answers to be given more weight in the displayed ordering of answers, to reward quality community involvement.
 * Priority: Like to Have
 * Release: Final Product

### 4.2 Course Evaluation & Profiles
Students and lecturers should be able to get a general idea about past course experiences.

#### Add a Review
As a student I want to be able to review a course that I have previously taken so that I can provide an evaluation of that course for others to view.
 * Priority: Must Have
 * Release: MVP

#### Read a Review
As a student I want to be able to read reviews about a course so that I can get an understanding of how others perceived the course.
 * Priority: Must Have
 * Release: MVP

#### Comment on a Review
As a student I want to comment on a review so that I can have further discussion about the course.
 * Priority: Must Have
 * Release: Final Product

#### Upvote a Review
As a student I want to up-vote a review so that I can provide feedback that it was useful and relevant.
 * Priority: Must Have
 * Release: Final Product

### 4.3 Identity & Authentication System
Users should be able to expect some sense of identification and authentication.

#### Anonymous Site Visitor
As a visitor without an account, I want to be able to view and search the site's content.
 * Priority: Must Have
 * Release: MVP

#### Anonymous Questions
As a visitor without an account, I want to be able to ask questions so I don't have to create an account to do so.
 * Priority: Must Have
 * Release: MVP

#### Student Account Creation
As a student, I want to be able to create an account with a university email address, so that I can unlock more site features.
 * Priority: Must Have
 * Release: Final Product

#### Enterprise Account Creation
As an enterprise customer, I should be able to request an enterprise account with an application form, so that I unlock unique site features.
 * Priority: Like to Have
 * Release: Final Product

#### Login and logout
As a user with an account, I should be able to log in and log out of my account with a username and password, to access my tailored site experience.
 * Priority: Must Have
 * Release: Final Product

#### Password Recovery
As a student, I should be able to retrieve my account password via email, so I don't lose account access.
 * Priority: Should Have
 * Release: Final Product

#### Profile page
As a user, I should be able to set up a personal profile page that contains personal information for community interaction.
 * Priority: Should Have
 * Release: Final Product

#### Home page / Feed
As a user, I should be presented with content based on my profile (including an anonymous home page), so that I find information that might be of interest to me.
 * Priority: Must Have
 * Release: MVP

### 4.4 Infrastructure, Maintenance and Performance
Users expect access to the application from outside a development environment.

#### Create Boiler Plate Code
As a developer I need to decide on and build a technology stack that makes sense given the scope of the project, so that the application meets its requirements.
 * Priority: Must Have
 * Release: MVP

#### Design an Appropriate Database Schema
As a developer, I want to design a schema that best collates related data so users are provided with relevant data about courses.
 * Priority: Must Have
 * Release: MVP

#### Domain Name
As a user I want to be able to access the application from a persistent URL, so that it's easy to remember and access.
 * Priority: Must Have
 * Release: Final Product

#### Remote Hosting
As a user I want to be able to access the application from a remote hosting service or with dedicated server infrastructure, so that I can access the site globally.
 * Priority: Must Have
 * Release: MVP

#### Deployment
As a developer I want to deploy updates to the application remotely, so user's can experience new features and improved performance.
 * Priority: Should Have
 * Release: Final Product

### 4.5 Design & User Experience
The application should make it easy for users to find what they are looking for and view it in a clear and easy fashion.

#### Consistent and Attractive Design
As a user, I should be able to rely on a consistent, attractive format to navigate the site, for a natural and pleasurable experience.
 * Priority: Must Have
 * Release: Final Product

#### Search by Course
As a user, I want to be able to search for a course by a course code/name, to quickly find information about a specific course.
 * Priority: Must Have
 * Release: MVP

#### Search by Category
As a user, I want to be able to search for course information via key descriptors, to get the most relevant information to me.
 * Priority: Like to Have
 * Release: Final Product

#### Mobile, Tablet, Desktop Support
As a user, I should be able to access the web application from a variety of devices, to access the application at different locations and support different users.
 * Priority: Should Have
 * Release: Final Product

#### Accessibility Support
As a user, I should be able to rely on w3c standards for accessibility, to ensure I can easily navigate the application.
 * Priority: Must Have
 * Release: Final Product

 #### Help Page
 As a user, I should be able to get help about how to use the site, to then be able to use it to its fullest potential.
 * Priority: Should Have
 * Release: Fina Product

### 4.6 Documentation, Licensing, Process and Code of Conduct
The application should provide adequate documentation and compliance to make it clear both how the application is used, the terms of service and behaviour, and any licensing or attribution requirements.

#### Licensing & Attribution
As a developer I want to know the licensing so that I can take appropriate steps to comply with licensing of software and relevant attribution of assets.
 * Priority: Must Have
 * Release: Final Product

#### EULA & T&Cs
As a user, I want a EULA & T&C so that I know the behaviour that is expected of myself when using the software.
 * Priority: Must Have
 * Release: Final Product

#### Documentation
As a user, I want a basic readme or usage documentation so that I can refer to it if I need to.
 * Priority: Like to Have
 * Release: Final Product
 
### 4.7 Moderation, Privacy & Safety
Users expect a certain degree of quality about both the responses being made and safety against, harsh, unfair, or unwarranted critique.

#### Report System
As a user, I want to be able to moderate content by reporting offensive, inappropriate or defamatory material.
 * Priority: Should Have
 * Release: Final Product

#### Moderators
As a user, I want to have someone to report issues to regarding offensive posts, irrelevant discussion, fake news, etc.
 * Priority: Must Have
 * Release: Final Product

#### Privacy
As a user, I should have the ability to display as little personal information as is required and only opt in to displaying extra information, with the option to delete my data.
 * Priority: Should Have
 * Release: Final Product

#### Profanity Filter
As a user, I want to avoid reading profanity which could offend me or others.
 * Priority: Like to Have
 * Release: Final Product

#### Data Breaches
As a user, I want to be informed of any possible/known data breach where my personal information could have been stolen.
 * Priority: Should Have
 * Release: Final Product

### 4.8 Enterprise API
An enterprise user should be able to get specific bespoke data from the application.

#### API Endpoints for data collection
As an enterprise user, I should be able to request specific information from authenticated endpoints about feedback and questions related to courses offered at my institution.
 * Priority: Like to Have
 * Release: Final Product

#### API Endpoints for updating information
As an enterprise user, I should be able to push updated course information/offerings to 'Smart Course', so there is no outdated information.
 * Priority: Like to Have
 * Release: Final Product

## 5.0 - Releases
A release is when we merge code to master, and is a (at least partially) working product. The goal is to do the first release very early and then iterate.

We'll have several releases throughout the lifetime of the project; something along the lines of:
1. Prototypes (as early as possible):
    * Minimum/incomplete features.
    * Testing integration of features.
2. Minimum Viable Product (Week 8/9):
    * Basic minimum requirements met.
3. Final Product (Week 12):
    * Thoroughly tested and polished.

### Minimum Viable Product (MVP)
We have defined our MVP by the following user stories (see details in section 4):
* Ask Questions
* Answer Questions
* View Questions and Answers
* Add a Review
* Read a Review
* Design an Appropriate Database Schema
* Anonymous Site Visitor
* Search by Course
* Remote Hosting

#### Mockups
![home](https://user-images.githubusercontent.com/4468620/44793778-69c4c400-abea-11e8-8da4-04387c5fec53.png)
![questionpage](https://user-images.githubusercontent.com/4468620/44793779-69c4c400-abea-11e8-98ea-d89407ebe4af.png)
![courseinfo](https://user-images.githubusercontent.com/4468620/44793780-69c4c400-abea-11e8-9a75-dae0ed11a5a4.png)
![coursequestions](https://user-images.githubusercontent.com/4468620/44793781-6a5d5a80-abea-11e8-9387-c805c22863b6.png)

## 6.0 - Roles
We have defined our group's agile roles as follows:
* Scrum Master - Alex
* Product Owner - Nuno
* Developers - Travis, Luke, Alex and Nuno

## 7.0 - Sprints & Meeting Schedule

### Sprints
Each sprint is one week long (Thursday to Thursday). The goal for each sprint is to choose a subset of user stories to work on and ideally finish within that sprint. To enable this to occur in an efficient fashion, we have planeed for both standups and sprint reviews.

### Standups
The goal of the standup is for each team member to answer the following 3 questions:
1. What have I been working on?
2. What am I working on next?
3. Is anything in my way?

Due to inability for the team to meet face-to-face throughout the week, our standups will occur in our dedicated slack channel (#standups), where each person will start their own thread when answering the questions. Discussion can then occur in the corresponding threads. We'll do these 3 times a week, on these days:
* Friday (8pm)
* Sunday (8pm)
* Tuesday (8pm)

### Sprint Review
Every Thursday, after the lecture, we'll do a 'Sprint Review' and organise the next sprint. The goal of this meeting is to:
1. Demo new features and make sure everyone in the team is up to speed with what's going on across the project.
2. Do a release if appropriate.
3. Evaluate the success of the sprint that just ended.
    * e.g. looking at burndown chart, seeing how many user stories were completed, etc.
4. Organise the next sprint:
    * Re-estimate tasks that took longer than expected, and possibly roll them over into the new sprint.
    * Determine new tasks/stories to be tackled in next sprint.
    * Determine the success criteria and estimates for each task/story.
    * Allocate tasks to people.

## 8.0 - Technologies
Management:
* ZenHub - Agile project mangement tool.
* GitHub - Code base hosting and organisation.
* Slack - Discussion forum and standup location.

Front End:
* Vue.js - JavaScript framework for building UI.

Back End:
* Node.js - JavaScript run-time server environment.
* Express.js - Web application framework for Node.js.
* SQLite - Database for all application data.

Testing:
* Travis CI - Continuous integration service for automated testing.

## 9.0 - Stories and Tasks in ZenHub
### All User Stories
We have added all the stories from section 4 into ZenHub, as seen in the image below.
![All Stories](https://user-images.githubusercontent.com/26681270/45141680-ea428080-b1f9-11e8-9b9f-966f5f794de7.png)

### Sprint Stories and Tasks
At the start of a sprint, we select what stories we are going to work on and break them down into tasks. Here is an example from the start of our current sprint (Sprint 4).
![Board](https://user-images.githubusercontent.com/26681270/45141691-f29abb80-b1f9-11e8-8e80-2b271d1eae8c.png)
![List](https://user-images.githubusercontent.com/26681270/45141683-ee6e9e00-b1f9-11e8-8e7d-cdfca4349535.png)

### Story Tile
A story contains:
- A description in the form "As a ___ I want to be able to ___ to ___."
- Acceptance criteria determined at the start of a sprint.
- Tasks associated with the user story, each with corresponding estimates.
![Story](https://user-images.githubusercontent.com/26681270/45141674-e31b7280-b1f9-11e8-984f-70731a829283.png)

### Task Tile
A task contains:
- A task description, which clearly states what is being addressed.
- The people assigned to the task, which is generally determined by equally splitting tasks so everyone has the same total estimate of work for the sprint.
- The sprint it is a part of.
- An estimate, which is determined at the start of each sprint, as a part of a team discussion. We consider factors like the experience of the assigned developers and overall difficulty.
- A feed of all events associated with the task. This includes things like task detail updates, pull requests and general discussion.
![Task](https://user-images.githubusercontent.com/26681270/45141677-e7479000-b1f9-11e8-86d8-77f489481a01.png)