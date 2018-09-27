import DummyDashboard from './Components/Dashboard/DummyDashboard';
import MyContainer from './Containers/Dashboard/Container';
import Projects from './Containers/Projects/Projects';
import NewProject from './Components/Projects/NewProject';
import Repositories from './Containers/Repositories/Repositories';
import NewRepository from './Components/Repositories/NewRepo';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    {path: '/', exact: true, name: 'Home', component: MyContainer},
    {path: '/dashboard', name: 'Dashboard', component: DummyDashboard},
    {path: '/projects', name: 'Projects', component: Projects},
    {path: '/newProject', name: 'NewProject', component: NewProject},
    {path: '/repositories', name: 'repositories', component: Repositories}

];

export default routes;
