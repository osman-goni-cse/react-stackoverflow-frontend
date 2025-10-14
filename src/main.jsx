import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import TagList from './TagList.jsx'
import CreateTagForm from './components/tags/CreateTagForm.jsx'
import CreatePostForm from './components/Posts/CreatePostForm.jsx'
import Root from './components/Root/Root.jsx'
import PostList from './PostList.jsx'
import PostDetail from './components/Posts/PostDetail.jsx'

/* **
* Have to move separte central component

*/


const fetchTags = fetch('http://localhost:5192/api/tag').then(res => res.json());

const fetchPosts = async() => {
  const res = await fetch('http://localhost:5192/api/post');
  return res.json();
} 


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root, 
    children: [
      {
        path: "/",
        element: <div>Hello from React Router SPA</div>
      },
      {
        path: "/tags",
        element: <TagList fetchTags={fetchTags}></TagList>
      },
      {
        path: "/tags/create",
        Component: CreateTagForm
      },
      {
        path: "/posts",
        element: <PostList fetchPosts={fetchPosts()}></PostList>
      },
      {
        path: "/posts/:id",
        loader: ({params}) => fetch('http://localhost:5192/api/post/' + params.id).then(res => res.json()),
        element: <PostDetail></PostDetail>
      },
      {
        path: "/posts/create",
        element: <CreatePostForm fetchTags={fetchTags}></CreatePostForm>
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
