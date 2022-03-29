const request = require('supertest')
const { v4: uuid } = require('uuid')
const { seedJson } = require('../utils')

const API = 'http://localhost:5000'
const BASE_PATH = '/api/v1'

const expectItem = (item) => {
  return expect(item).toEqual(expect.objectContaining({
    completed: expect.any(Boolean),
    description: expect.any(String),
    id: expect.any(String)
  }))
}

const expectList = (list) => {
  return expect(list).toEqual(expect.objectContaining({
    _id: expect.any(String),
    id: expect.any(String),
    createdAt: expect.any(Number),
    items: expect.any(Array),
    updatedAt: expect.any(Number),
    __v: expect.any(Number)
  }))
}

// INSTRUCTIONS
console.warn('NOTE: These tests rely on docker-compose up and do not create a seperate test server! Tests require ordered sequence.');

// MIDDLEWARE
describe('Test List Middleware', () => {
  it('should check for a query string [DELETE | GET]', async () => {
    const res1 = await request(API).delete(`${BASE_PATH}/list/`)
    const res2 = await request(API).delete(`${BASE_PATH}/list/`).query({ listId: undefined })
    const res3 = await request(API).get(`${BASE_PATH}/list/`)
    const res4 = await request(API).get(`${BASE_PATH}/list/`).query({ listId: undefined })

    expect(res1.statusCode).toEqual(400)
    expect(res2.statusCode).toEqual(400)
    expect(res3.statusCode).toEqual(400)
    expect(res4.statusCode).toEqual(400)
  })

  it('should check for a body [POST | PUT]', async () => {
    const res1 = await request(API).post(`${BASE_PATH}/list/`).send({})
    const res2 = await request(API).put(`${BASE_PATH}/list/`).send({})

    expect(res1.statusCode).toEqual(400)
    expect(res2.statusCode).toEqual(400)
  })

  it('should validate a todo [POST]', async () => {
    const newTodo = {
      completed: 'true',
      description: false,
      id: 666
    }

    const res = await request(API)
      .put(`${BASE_PATH}/list/`)
      .send({ newTodo })

    expect(res.statusCode).toEqual(400)
  })

  it('should validate new todos [PUT]', async () => {
    const list = JSON.parse(JSON.stringify(seedJson[0]))
    list.id = 666
    list.createdAt = new Date()
    list.updatedAt = new Date()

    const res = await request(API)
      .put(`${BASE_PATH}/list/`)
      .send({ list })

    expect(res.statusCode).toEqual(400)
  })
})

// // GET
// describe('Test GET Endpoint', () => {
//   it('should get a list', async () => {
//     const res = await request(API).get(`${BASE_PATH}/list/`).query({ listId: seedJson[0].id })

//     expect(res.statusCode).toEqual(200)
//     expectList(res.body)
//   })
// })

// // DELETE
// describe('Test DELETE Endpoint', () => {
//   it('should delete a list', async () => {
//     const res = await request(API).delete(`${BASE_PATH}/list/`).query({ listId: seedJson[0].id })

//     expect(res.statusCode).toEqual(200)
//   })
// })

// // POST
// describe('Test POST Endpoint', () => {
//   it('should create a new list and return it', async () => {
//     const list = JSON.parse(JSON.stringify(seedJson[0]))
//     const res = await request(API)
//       .post(`${BASE_PATH}/list/`)
//       .send({ list })

//     expect(res.statusCode).toEqual(200)
//     expectList(res.body)
//   })
// })

// // PUT
// describe('Test PUT Endpoint', () => {
//   it('should update and return list', async () => {
//     const newTodo = {
//       completed: false,
//       description: 'Pass Unit Tests',
//       id: '17e6e28d-ea2f-47e0-9c83-a5c4997e7763'
//     }
//     const res = await request(API)
//       .put(`${BASE_PATH}/list/`)
//       .send({ newTodo })

//     expect(res.statusCode).toEqual(200)
//     expectItem(res.body.items[0])
//     expect(res.body.items[req.body.items.length - 1]).toEqual(newTodo)
//   })
// })