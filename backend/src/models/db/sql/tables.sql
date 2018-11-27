IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='faculties' AND xtype='U')
    CREATE TABLE faculties (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        name VARCHAR(255) NOT NULL
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='degrees' AND xtype='U')
    CREATE TABLE degrees (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        name VARCHAR(255) NOT NULL,
        longName VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        tags VARCHAR(255),
        facultyID INTEGER NOT NULL,
        CONSTRAINT fk_faculty_degree
            FOREIGN KEY (facultyID)
            REFERENCES faculties (id)
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
    CREATE TABLE users (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        uid VARCHAR(255) UNIQUE NOT NULL,
        displayName VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        joined DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
        reputation INTEGER DEFAULT '0',
        degreeID INTEGER NOT NULL,
        gradYear TIMESTAMP,
        description VARCHAR(8000),
        picture VARCHAR(8000),
        CONSTRAINT fk_degree_user
            FOREIGN KEY (degreeID)
            REFERENCES degrees (id)
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='university' AND xtype='U')
    CREATE TABLE university (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        name VARCHAR(255) NOT NULL
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='subjects' AND xtype='U')
    CREATE TABLE subjects (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        code VARCHAR(255) NOT NULL,
        universityID INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        handbookURL VARCHAR(255) NOT NULL,
        CONSTRAINT fk_university_subject
            FOREIGN KEY (universityID)
            REFERENCES university (id)
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='courses' AND xtype='U')
    CREATE TABLE courses (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        code VARCHAR(255) NOT NULL,
        universityID INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        studyLevel VARCHAR(255) NOT NULL,
        subjectID INTEGER NOT NULL,
        handbookURL VARCHAR(255) NOT NULL,
        outlineURL VARCHAR(255),
        description VARCHAR(8000),
        requirements VARCHAR(8000),
        recommend INTEGER DEFAULT '-1',
        enjoy INTEGER DEFAULT '50',
        difficulty INTEGER DEFAULT '50',
        teaching INTEGER DEFAULT '50',
        workload INTEGER DEFAULT '50',
        tags VARCHAR(8000),
        CONSTRAINT fk_university_course
            FOREIGN KEY (universityID)
            REFERENCES university (id),
        CONSTRAINT fk_subject_course
            FOREIGN KEY (subjectID)
            REFERENCES subjects (id)
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='questions' AND xtype='U')
    CREATE TABLE questions (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        courseID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        body VARCHAR(8000) NOT NULL,
        pinned INTEGER DEFAULT 0,
        timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
        CONSTRAINT fk_course_question
            FOREIGN KEY (courseID)
            REFERENCES courses (id),
        CONSTRAINT fk_user_question
            FOREIGN KEY (userID)
            REFERENCES users (id)
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='reviews' AND xtype='U')
    CREATE TABLE reviews (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        courseID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        body VARCHAR(8000) NOT NULL,
        recommend INTEGER NOT NULL,
        enjoy INTEGER NOT NULL,
        difficulty INTEGER DEFAULT '0',
        teaching INTEGER DEFAULT '0',
        workload INTEGER DEFAULT '0',
        timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
        CONSTRAINT fk_course_review
            FOREIGN KEY (courseID)
            REFERENCES courses (id),
        CONSTRAINT fk_user_review
            FOREIGN KEY (userID)
            REFERENCES users (id)
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='comments' AND xtype='U')
    CREATE TABLE comments (
        id INTEGER PRIMARY KEY IDENTITY(1,1),
        questionID INTEGER,
        reviewID INTEGER,
        commentParent INTEGER,
        userID INTEGER NOT NULL,
        body VARCHAR(8000) NOT NULL,
        timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
        CONSTRAINT fk_question_comment
            FOREIGN KEY (questionID)
            REFERENCES questions (id),
        CONSTRAINT fk_review_comment
            FOREIGN KEY (reviewID)
            REFERENCES reviews (id),
        CONSTRAINT fk_user_comment
            FOREIGN KEY (userID)
            REFERENCES users (id)
    );

IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='likes' AND xtype='U')
BEGIN
    CREATE TABLE likes (
        objectType VARCHAR(255) NOT NULL,
        objectID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        value INTEGER DEFAULT '0',
        CONSTRAINT fk_user_like
            FOREIGN KEY (userID)
            REFERENCES users (id)
    );
    CREATE UNIQUE INDEX id ON likes (objectType, objectID, userID);
END