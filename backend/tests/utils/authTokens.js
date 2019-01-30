const app = require('../../src')
const supertest = require('supertest')(app)
const fetch = require('node-fetch')

function createGlobalIdToken(varName, displayName, email, password, existingProfile = false) {
    return fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyANscpcUrt-ECaX8lqu3vQTtEyggcZ_7X4',
        {
            'credentials': 'omit',
            'headers': {},
            'referrer': 'http://localhost:8080/login',
            'referrerPolicy': 'no-referrer-when-downgrade',
            'body': `{"email":"${email}","password":"${password}","returnSecureToken":true}`,
            'method': 'POST',
            'mode': 'cors'
        })
        .then((res) => res.json())
        .then((data) => {
            global[varName] = data.idToken
            if (existingProfile) { return }
            // if no existing profile, create one in the backend
            return supertest.post('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global[varName]}`)
                .send({ displayName, degree: 'B. Arts', gradYear: 2018 })
                .expect(200)
        })
}

async function setup() {
    // create 3 backend tester users
    const promises = new Array(3).fill(0).map((_, i) =>
        createGlobalIdToken(
            `idToken${i}`,
            `BackendTester${i}`,
            process.env[`BACKEND_TEST_EMAIL_${i}`],
            process.env[`BACKEND_TEST_PASSWORD_${i}`]
        )
    )
    // and the superuser
    promises.push(
        createGlobalIdToken(
            'idTokenSuper',
            'SuperUser',
            process.env.SUPERUSER_NUNO_EMAIL,
            process.env.SUPERUSER_NUNO_PASSWORD,
            true
        )
    )

    await Promise.all(promises)
}

before(() => setup())
