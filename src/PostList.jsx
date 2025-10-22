import { use, useEffect, useState } from "react";
import Post from "./Post";
import { Plus } from "lucide-react";
import CreatePostForm from "./components/Posts/CreatePostForm";

const fetchTags = fetch('http://localhost:5192/api/tag').then(res => res.json());


export default function PostList({fetchPosts}){
    // const posts = use(fetchPosts);
    const [posts, setPosts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCreateClick = () => {
        setShowCreateForm((prev) => !prev); // toggle form visibility
    };

    const handleFormClose = () => {
        setShowCreateForm(false);
    };

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts;
                setPosts(data);
            }catch(err){
                console.error("Error fetching tags:", err);
            }
        };
        loadPosts();
    }, [fetchPosts]);

    const handlePostCreated = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    return (
        <div className="w-full mt-10 px-4 max-w-5xl mx-auto">
        {/* Header + Create Post Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 pb-3 mb-6 gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">All Posts</h1>
            <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">
                Number of Posts: {posts.length}
            </span>
            <button
                onClick={handleCreateClick}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
                <Plus className="w-4 h-4" />
                Create Post
            </button>
            </div>
        </div>

        {/* Inline Create Post Form */}
        {showCreateForm && (
            <div className="mb-6">
            <CreatePostForm fetchTags={fetchTags} onClose={handleFormClose} onPostCreated={handlePostCreated} />
            <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
            >
                ← Back to Posts
            </button>
            </div>
            
        )}

        {/* Posts List */}
        {!showCreateForm && (
            <div className="space-y-5">
            {posts.map((post, index) => (
            <Post key={index} id={post.id} title={post.title} content={post.content} />
            ))}
            </div>
        )}
        </div>
    );
}