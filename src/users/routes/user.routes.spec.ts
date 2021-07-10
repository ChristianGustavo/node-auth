import supertest, { SuperAgentTest } from 'supertest';

import app from './../../app';

describe('UserRoutes', () => {
  let request: SuperAgentTest;

  beforeAll(() => {
    request = supertest.agent(app);
  });

  afterAll(() => {
    app.close();
  })

  it('should call /users and retrieve all users', async () => {
    const response = await request.get('/users').then((res) => res);
    expect(response.body).toBeDefined();
  });

});