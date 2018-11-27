const { expect } = require('chai')
// use an actual database
const userModel = require('../../src/models/user')(require('../../src/models/db'))

describe('User Model', () => {
    it('compiles', function () {
        expect(userModel)
    })

    describe('User creation and retrieval', () => {
        const addUserObj = { displayName: 'mickey', gradYear: 2010, degree: 'B. S.', email: 'potato@potatoman.potato', uid: '1234' }
        const retrieveUserObj = { email: addUserObj.email, displayName: addUserObj.displayName, degree: addUserObj.degree, gradYear: addUserObj.gradYear, description: null, picture: null }
        it('it creates a user and retrieves the profile', () => {
            return userModel
                .createUser(addUserObj)
                .then(({ displayName, email, id }) => {
                    expect(displayName).to.equal(addUserObj.displayName)
                    expect(email).to.equal(addUserObj.email)
                    return userModel.getProfile(id)
                })
                .then(({ email, displayName, degree, gradYear, description, picture }) => {
                    const profile = { email, displayName, degree, gradYear, description, picture }
                    expect(profile).to.deep.equal(retrieveUserObj)
                })
        })
    })

    describe('User update', () => {
        const credsObj = { displayName: 'mickeyMoo', email: 'tomatoboy@hotmail.zomg' }
        const addUserObj = { ...credsObj, uid: '4321', gradYear: 2020, degree: 'BS in BS' }
        const updateObj = { degree: 'BS in CS', gradYear: 2026, description: 'testu', picture: 'baaaaaa' }
        it('it updates the profile correctly', () => {
            return userModel
                .createUser(addUserObj)
                .then(({ id, description }) => {
                    return userModel.updateUser(id, updateObj)
                })
                .then(({ email, displayName, degree, gradYear, description, picture }) => {
                    const profile = { email, displayName, degree, gradYear, description, picture }
                    expect(profile).to.deep.equal({ ...credsObj, ...updateObj })
                })
        })
    })
})
