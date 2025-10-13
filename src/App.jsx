import { Suspense } from 'react'
import './App.css'
import TagList from './TagList'
import PostList from './PostList'
import CreateTagForm from './components/tags/CreateTagForm';
import CreatePostForm from './components/Posts/CreatePostForm';


const fetchTags = fetch('http://localhost:5192/api/tag').then(res => res.json());

const fetchPosts = async() => {
  const res = await fetch('http://localhost:5192/api/post');
  return res.json();
} 

function App() {
  const fetchPostData = fetchPosts();

  return (
    <>
    <h1 class="text-4xl text-orange-500 text-center py-5 my-5">
    Hello world!
    </h1>
    <CreateTagForm></CreateTagForm>
    <CreatePostForm fetchTags={fetchTags}></CreatePostForm>
      {/* <Suspense fallback={<h2>Loading Posts...</h2>}>
        <PostList fetchPosts={fetchPostData}></PostList>
      </Suspense>
      <Suspense fallback={<h1>Loading tags...</h1>}>
       <TagList fetchTags={fetchTags}></TagList>
      </Suspense> */}
    </>
  )
}


export default App
