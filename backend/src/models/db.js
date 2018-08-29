const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/questions.db')

/* Used a tutorial to help get started...
 * This will be changed in the very near future.
 */
db.serialize(() => {
    // Create the questions database
    db.run(`CREATE TABLE questions (
        cid INTEGER,
        uid INTEGER,
        likes INTEGER,
        title TEXT,
        body TEXT)`
    )

    // Now insert some fake test data
    db.run(`INSERT INTO questions VALUES (
        1,
        1,
        500,
        "Nono to Nuno",
        "I need to know what you guys think about Nuno's Moustache???")`,
    (err) => {
        if (err) {
            return console.log(err.message)
        }
        console.log('Successfully added test data')
    }
    )
    db.run(`INSERT INTO questions VALUES (
        1,
        2,
        200,
        "Help Regarding Crush on Lecturer",
        "I can't concentrate in COMP2041 because the lecturer Alex is too damn hot. What should I do?")`,
    (err) => {
        if (err) {
            return console.log(err.message)
        }
        console.log('Successfully added test data')
    }
    )

    // Create the answers database
    db.run(`CREATE TABLE answers (
        cid INTEGER,
        qid INTEGER,
        uid INTEGER,
        likes INTEGER,
        title TEXT,
        body TEXT)`
    )

    // Now insert some fake test data
    db.run(`INSERT INTO answers VALUES (
        1,
        1,
        3,
        100,
        "If Mario and Luigi had a son...",
        "It would be Nuno")`,
    (err) => {
        if (err) {
            return console.log(err.message)
        }
        console.log('Successfully added test data')
    }
    )
    db.run(`INSERT INTO answers VALUES (
        1,
        2,
        4,
        25,
        "Honesty Is The Best Policy (tag: Ethics)",
        "It is important to be honest and express your feelings <3")`,
    (err) => {
        if (err) {
            return console.log(err.message)
        }
        console.log('Successfully added test data')
    }
    )

    // Check the dummy database was successfully created
    db.each('SELECT cid, uid, likes, title, body FROM questions', function (_, row) {
        console.log(row.title + '\n' + row.body)
    })
    db.each('SELECT cid, qid, uid, likes, title, body FROM answers', function (_, row) {
        console.log(row.title + '\n' + row.body)
    })
})
