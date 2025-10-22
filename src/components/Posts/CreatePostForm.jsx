import { use, useState } from "react"
import { useNavigate } from "react-router";

export default function CreatePostForm({fetchTags, onClose, onPostCreated}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(8);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const availableTags = use(fetchTags);

    // console.log("Available Tags", availableTags);

    const handleTagChange = (e) => {
        const {value, checked} = e.target;
        const tagId = parseInt(value);

        setSelectedTagIds(prev => 
            checked ? [...prev, tagId]
                    : prev.filter(id => id !== tagId)
        )
    }


    async function handleSubmit(e) {
        e.preventDefault();
        
        if(!title.trim() || !content.trim() || !userId) {
            alert("Required Fields are empty");
            return;
        }

        const payload = {
            title, 
            content, 
            userId, 
            tagIds: selectedTagIds
        };

        console.log("POST request", payload);



        const res = await fetch("http://localhost:5192/api/post", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if(res.ok) {
            onPostCreated(payload);
            onClose();
            navigate("/posts");
            // alert("Post Created Successfully");
        }else {
            alert("Post is not created");
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Ask Your Question</h2>
    
            {/* ✅ Create Tag Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <input type="hidden" />
                <div className="mb-3">
                    <label className="block font-medium mb-1">Title</label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="w-full border p-2 rounded"
                    />
                </div>
        
                <div className="mb-3">
                    <label className="block font-medium mb-1">Content</label>
                    <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter description"
                    className="w-full border p-2 rounded"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="font-medium mb-1 mr-5">Tags</label>
                    {
                        availableTags.map(tag => {
                            return (
                            <div key={tag.id} className="flex items-center">
                                <input type="checkbox"
                                id={`tag-${tag.id}`}
                                name="tags"
                                value={tag.id}
                                checked={selectedTagIds.includes(tag.id)}
                                onChange={handleTagChange}
                                className="w-4 h-4">
                                </input>
                                <label htmlFor={`tag-${tag.id}`} className="ml-2 cursor pointer"> {tag.name}</label>
                            </div>
                            )

                        })
                    }
                </div>
        
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Post"}
                </button>
            </form>
    
           
        </div>
    )
}