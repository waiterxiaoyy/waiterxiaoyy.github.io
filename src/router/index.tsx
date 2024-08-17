import { createBrowserRouter, Navigate } from 'react-router-dom';
import ILayout from '../layout';
import Home from '../views/home';
import Demo from '../views/demo';
import Blog from '../views/blog';
import Resume from '../views/resume';
import BlogList from '../components/blog/list';
import BlogArticle from '../components/blog/article';
import IEditor from '@/views/editor';
import NotFound from '@/views/notfound/404';

const router = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },

  {
    id: 'layout',
    element: <ILayout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/demo',
        element: <Demo />
      },
      {
        path: '/blog',
        element: (
          <Blog>
            <BlogList />
          </Blog>
        )
      },
      {
        path: '/blog/:articleId',
        element: (
          <Blog>
            <BlogArticle />
          </Blog>
        )
      },
      {
        path: '/resume',
        element: <Resume />
      },
      {
        path: '/editor',
        element: <IEditor />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default createBrowserRouter(router);
