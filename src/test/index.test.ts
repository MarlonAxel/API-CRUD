const {initServer} = require('../server');
const request = require('supertest')


describe("GET / ", () => {
    test("", async () => {
      const response = await request(initServer)
      expect(typeof initServer).toBe('function');

    });
  });