import DummyDashboard from './Components/Dashboard/DummyDashboard';
import MyContainer from './Containers/Dashboard/Container';
import Projects from './Containers/Projects/Projects';
import NewProject from './Components/Projects/NewProject';

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: MyContainer
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DummyDashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/newProject',
    name: 'NewProject',
    component: NewProject
  }
  // ,{path: "/repositories", name: "repositories", component: Repositories}

];

export default routes;
