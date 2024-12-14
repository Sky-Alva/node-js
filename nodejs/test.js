const mongoose = require("mongoose")
const request = require("supertest")
const app = require("./index")

const TEST_USER= 'hendra'
const TEST_PASSWORD = '123456'
const TEST_ID = 'oua98d31iodhsaohdoahd'

let TOKEN = null


describe('Init',()=>{
    it('should return 200', async()=>{
        const res = await request(app).get('/')
        expect(res.statusCode).toBe(200)
    })
})

describe('Add Battery',()=>{
    it('should return 200', async()=>{
        const res = await request(app).get('/add/?ChargingStation=Station1&Capacity=100kWH&Models=103')
        expect(res.statusCode).toBe(200)
        expect(res.toBeGreaterThan(0))
        console.log(res)
    })
})
describe('Auth API',()=>{
    it('should return 200', async()=>{
        const res = (await request(app).post('auth/login')).send({username:TEST_USER, password: TEST_PASSWORD})
        expect(res.statusCode).toBe(200)
        expect(res.body.error).toBe(false)
        expect(res.body.data.token.length.toBeGreaterThan(0))
        TOKEN = res.body.data.token
        console.log(TOKEN)
    })
})

describe('USER API',()=>{
    it('GET by id',async()=>{
        const res = (await request(app).get('user/get')).set('Authorization', 'Bearer' + TOKEN ).query({id: TEST_ID})
        expect(res.statusCode).toBe(200)
    })
})