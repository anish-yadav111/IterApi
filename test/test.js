const request = require('supertest')
const expect = require('chai').expect

const app = require('../app')

describe("App ",() => {

    it("GET /" ,(done) => {
        request(app).get('/')
                    .then((res) => {
                        const body = res.body
                        expect(body).to.equal("Hello World")
                        done()
                    })
    })
})
