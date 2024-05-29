import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import App from '../views/App';
import OurHeros from '../views/Heros';
import About from '../views/About';
import HeroDetails from '../views/HeroDetails';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App><Home /></App>,
    },
    {
        path: '/about',
        element: <App><About/></App>,
    },
    {
        path: '/heros',
        element: <App><OurHeros/></App>,
    },
    {
        path: '/heros/:id',
        element: <App><HeroDetails/></App>,
    },
    {
        path: '*',
        element: <>Not Founddd</>
    }
]);

export default router;