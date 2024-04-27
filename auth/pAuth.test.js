// const axios = require("axios");
// const express = require('express');
// const supertest = require('supertest');
// const pAuth = require('./pAuth'); 

// jest.mock('axios');

// const app = express();
// app.get('/authorize', pAuth, (req, res) => {
//   res.status(200).json(req.oauth);
// });

// describe('pAuth middleware', () => {
//   it('should return 401 if code is missing', () => {
//     return supertest(app)
//       .get('/authorize')
//       .expect(401)
//       .then(response => {
//         expect(response.text).toEqual("Missing authorization code");
//       });
//   });

//   it('should call next middleware with oauth data on success', () => {
//     const fakeData = { access_token: '12345' };
//     axios.post.mockResolvedValue({ data: fakeData });

//     return supertest(app)
//       .get('/authorize?code=somecode')
//       .expect(200)
//       .then(response => {
//         expect(response.body).toEqual(fakeData);
//       });
//   });

//   it('should return 403 if axios throws an error', () => {
//     axios.post.mockRejectedValue(new Error('Bad request'));

//     return supertest(app)
//       .get('/authorize?code=somecode')
//       .expect(403)
//       .then(response => {
//         expect(response.body).toEqual('Reason : ${err.message}');
//       });
//   });
// });
