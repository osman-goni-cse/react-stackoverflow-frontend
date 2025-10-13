import { use, useState } from "react";
import Tag from "./Tag";
import { Plus } from "lucide-react";
import CreateTagForm from "./components/tags/CreateTagForm";

export default function TagList({fetchTags}){
    // console.log(fetchTags);
    const tags = use(fetchTags);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (tagName) => {
        console.log(`Delete tag: ${tagName}`);
    };

    const handleCreateTag = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    return (
    <div className="w-full bg-gray-50 min-h-screen p-6">
        <div className="">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tags</h1>
            <p className="text-gray-600">
            A tag is a label that categorizes your question with other, similar questions.
            </p>
        </div>

        {/* Stats + Filter + Create Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {tags.length} Tags
          </h2>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Filter by tag name..."
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleCreateTag}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Tag
            </button>
          </div>
        </div>


        {/* Tags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.length > 0 ? (
            tags.map(tag => (
                <Tag
                key={tag.id}
                name={tag.name}
                description={tag.description}
                onDelete={handleDelete}
                />
            ))
            ) : (
            <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No tags found</p>
            </div>
            )}
        </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <>
            {/* Background overlay with blur */}
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-[1px] z-40 "></div>

            {/* Modal content */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative border-solid border-2 border-black-500 ">
                {/* Close button */}
                <button
                    onClick={handleCloseModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
                >
                    ×
                </button>

                {/* Modal body: your CreateTagForm */}
                <CreateTagForm onClose={handleCloseModal} />
                </div>
            </div>
            </>
        )}
    </div>
    );
}