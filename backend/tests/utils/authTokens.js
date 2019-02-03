const app = require('../../src')
const supertest = require('supertest')(app)
const fetch = require('node-fetch')
const { getRandomIntInclusive } = require('../../src/utils/helpers')

async function createGlobalIdToken(varName, displayName, email, password, existingProfile = false) {
    // sleep a random amount because we're hitting google's api
    await new Promise(resolve => setTimeout(resolve, getRandomIntInclusive(100, 500)))
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

function setup() {
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

    return Promise.all(promises)
}

before(() => {
    // create a promise that will resolve when the app has initialized
    let res
    let promise = new Promise((resolve) => { res = resolve })
    app.on('ready', () => {
        res()
    })
    // call setup once app has initialized
    return promise.then(() => setup())
})
