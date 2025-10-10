import { use } from "react";
import Post from "./Post";

export default function PostList({fetchPosts}){
    console.log("Fetch Posts", fetchPosts);
    const fetchdata = use(fetchPosts);
    return (
        <div className='post-list'>
            <h2>Number of Posts: {fetchdata.length}</h2>
            {
                fetchdata.map(post => (
                    <Post key={post.id} title={post.title} content={post.content}></Post>
                ))
            }
        </div>
    )
}