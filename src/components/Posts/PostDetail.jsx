import { MessageCircle, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";

export default function PostDetail(){

    const [answerBody, setAnswerBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const post = useLoaderData();

    console.log(post);

    const handleSubmit = async () => {
      const payload = {
        postId : post.id,
        body : answerBody,
        userId : post.userId, // should be logged in user
      }
      await fetch(`http://localhost:5192/api/answer`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // sample userId
      });
      window.location.reload();
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 px-6">
          {/* Question Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {post.title}
            </h1>
    
            {/* Question Meta Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-sm px-2 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-200"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
    
              <div className="text-sm text-gray-600">
                Asked by{" "}
                <span className="font-medium text-gray-800">
                  {post.user?.displayName}
                </span>
              </div>
            </div>
    
            {/* Question Content */}
            <p className="text-gray-800 leading-relaxed mb-6">{post.content}</p>
    
            {/* Vote & Comment Info */}
            <div className="flex items-center space-x-6 text-gray-600 text-sm">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>12 votes</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.answers?.length || 0} answers</span>
              </div>
            </div>
          </div>
    
          {/* Answers Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {post.answers?.length > 0
                ? `${post.answers.length} Answers`
                : "No Answers Yet"}
            </h2>
    
            <div className="space-y-5">
              {post.answers?.map((answer) => (
                <div
                  key={answer.id}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
                >
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    {answer.body}
                  </p>
    
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>3 votes</span>
                    </div>
                    <div>
                      Answered by{" "}
                      <span className="font-medium text-gray-800">
                        {answer.user?.displayName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-300 my-10"></div>

          {/* Your Answer Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Answer
            </h3>

            <form onSubmit={handleSubmit}>
              <textarea
                value={answerBody}
                onChange={(e) => setAnswerBody(e.target.value)}
                placeholder="Write your answer here..."
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-y"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-150"
              >
                {isSubmitting ? "Posting..." : "Post Your Answer"}
              </button>
            </form>
          </div>
        </div>
      );
}