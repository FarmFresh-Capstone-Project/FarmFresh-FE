import Home from '../views/pages/home';
import DetailPage from '../views/pages/detailPage';

const routes = {
  '/': Home,
  '/home': Home,
  '/detail/:id': DetailPage,
};

export default routes;
