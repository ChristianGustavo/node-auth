import express from 'express';

import UserRoutes from './users/routes/user.routes';

const app = express();

const routes = [UserRoutes];

routes.forEach((Route) => new Route(app));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
