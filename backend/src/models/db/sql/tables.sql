CREATE TABLE IF NOT EXISTS faculties (
        name TEXT PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS degrees (
        name TEXT PRIMARY KEY NOT NULL,
        longName TEXT NOT NULL,
        type TEXT NOT NULL,
        faculty TEXT NOT NULL,
        tags TEXT,
        FOREIGN KEY (faculty) REFERENCES faculties(name)
);

CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT UNIQUE NOT NULL,
        displayName TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        joined INTEGER NOT NULL DEFAULT (strftime('%s','now')),
        reputation INTEGER DEFAULT '0',
        degree TEXT,
        gradYear TIMESTAMP,
        description TEXT,
        picture TEXT,
        FOREIGN KEY (degree) REFERENCES degrees(name)
);

CREATE TABLE IF NOT EXISTS university (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subjects (
        code TEXT PRIMARY KEY NOT NULL,
        universityID INTEGER NOT NULL,
        name TEXT NOT NULL,
        handbookURL TEXT NOT NULL,
        FOREIGN KEY (universityID) REFERENCES university(id)
);

CREATE TABLE IF NOT EXISTS courses (
        code TEXT PRIMARY KEY NOT NULL,
        universityID INTEGER NOT NULL,
        name TEXT NOT NULL,
        studyLevel TEXT NOT NULL,
        subjectCode TEXT NOT NULL,
        handbookURL TEXT NOT NULL,
        outlineURL TEXT,
        description TEXT NOT NULL,
        requirements TEXT,
        recommend INTEGER DEFAULT '-1',
        enjoy INTEGER DEFAULT '50',
        difficulty INTEGER DEFAULT '50',
        teaching INTEGER DEFAULT '50',
        workload INTEGER DEFAULT '50',
        tags TEXT,
        FOREIGN KEY (universityID) REFERENCES university(id),
        FOREIGN KEY (subjectCode) REFERENCES subjects(code)
);

CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        userID INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        pinned INTEGER DEFAULT 0,
        timestamp INTEGER NOT NULL DEFAULT (strftime('%s','now')),
        FOREIGN KEY (code) REFERENCES courses(code),
        FOREIGN KEY (userID) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        userID INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        recommend INTEGER NOT NULL,
        enjoy INTEGER NOT NULL,
        difficulty INTEGER DEFAULT '0',
        teaching INTEGER DEFAULT '0',
        workload INTEGER DEFAULT '0',
        timestamp INTEGER NOT NULL DEFAULT (strftime('%s','now')),
        FOREIGN KEY (code) REFERENCES courses(code),
        FOREIGN KEY (userID) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        questionID INTEGER,
        reviewID INTEGER,
        commentParent INTEGER,
        userID INTEGER NOT NULL,
        body TEXT NOT NULL,
        timestamp INTEGER NOT NULL DEFAULT (strftime('%s','now')),
        FOREIGN KEY (questionID) REFERENCES questions(id),
        FOREIGN KEY (reviewID) REFERENCES reviews(id),
        FOREIGN KEY (userID) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS likes (
        objectType TEXT NOT NULL,
        objectID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        value INTEGER DEFAULT '0',
        FOREIGN KEY (userID) REFERENCES users(id)
);

CREATE UNIQUE INDEX id ON likes (objectType, objectID, userID);
