import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import App from '../views/App';
import OurHeros from '../views/Heros';
import About from '../views/About';
import HeroDetails from '../views/HeroDetails';
import Error from '../views/Error';
import Login from '../views/auth/Login';
import Registration from '../views/auth/Registration';
import UploadHero from '../views/UploadHero';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path: '/about',
                Component: About,
            },
            {
                path: '/heros',
                Component: OurHeros,
            },
            {
                path: '/heros/:id',
                Component: HeroDetails,
            },
            {
                path: '/upload-hero',
                Component: UploadHero,
            },
            {
                path:'/registration',
                Component: Registration
            },
            {
                path:'/login',
                Component: Login
            }
        ]
    },
    {
        path: '*',
        element: <Error/>
    }
    
]);

export default router;