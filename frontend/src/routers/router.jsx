import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx'
import Home from '../pages/home/Home.jsx'
import CategoryPage from '../pages/category/CategoryPage.jsx';
import Search from '../pages/search/Search.jsx';
import ClosetPage from '../pages/closet/ClosetPage.jsx';
import SingleItem from '../pages/closet/itemDetails/SingleItem.jsx';
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/closet", element: <ClosetPage /> },
      { path: "/closet/:id", element: <SingleItem /> },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
]);

export default router;