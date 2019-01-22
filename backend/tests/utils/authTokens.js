const app = require('../../src')
const supertest = require('supertest')(app)
const fetch = require('node-fetch')

function createGlobalIdToken(varName, displayName, email, password) {
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
            return supertest.post('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global[varName]}`)
                .send({ displayName, degree: 'B. Arts', gradYear: 2018 })
        })
}

async function setup() {
    await Promise.all(
        new Array(3).fill(0).map((_, i) =>
            createGlobalIdToken(
                `idToken${i}`,
                `BackendTester${i}`,
                process.env[`BACKEND_TEST_EMAIL_${i}`],
                process.env[`BACKEND_TEST_PASSWORD_${i}`]
            )
        )
    )
}

before(() => setup())
