import { useState } from "react";

export default function CreateTagForm(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if(!name.trim() || !description.trim()){
            alert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        const newTag = {name, description};

        try {
            const res = await fetch('http://localhost:5192/api/tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTag)
            });
            if(res.ok){
                setName("");
                setDescription("");
                alert("Tag created successfully!");
            } else {
                alert("Failed to create tag.");
            }
        }catch(err){
            console.error("Error creating tag:", err);
            alert("Error creating tag.");
        }
        
    }
    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Tag Manager</h2>
    
            {/* ✅ Create Tag Form */}
            <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-3">
                <label className="block font-medium mb-1">Tag Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter tag name"
                className="w-full border p-2 rounded"
                />
            </div>
    
            <div className="mb-3">
                <label className="block font-medium mb-1">Description</label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full border p-2 rounded"
                ></textarea>
            </div>
    
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
            >
                {loading ? "Creating..." : "Create Tag"}
            </button>
            </form>
    
           
        </div>
        );
        
}
