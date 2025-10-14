import { Link } from "react-router";

export default function Post({ id, title, content, tags = [], votes = 0, comments = 0, author = "Anonymous", asked = "Just now" }) {
    return (
      <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
        {/* Title */}
        <h2 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer mb-2">
          <Link to={`/posts/${id}`}>{title}</Link>
        </h2>
  
        {/* Content */}
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-3">
          {content}
        </p>
  
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
  
        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-3">
          {/* Votes and comments */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {votes} votes
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m10-3l-4-4m0 0L7 5m4-4v16" />
              </svg>
              {comments} comments
            </span>
          </div>
  
          {/* Author info */}
          <div className="text-right">
            <span className="block text-gray-800 font-medium">{author}</span>
            <span className="text-xs text-gray-500">asked {asked}</span>
          </div>
        </div>
      </div>
    );
  }
  