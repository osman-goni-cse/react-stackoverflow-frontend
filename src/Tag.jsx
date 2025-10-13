import { Trash2 } from "lucide-react";

export default function Tag({name, description, onDelete}){
    
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
              {name}
            </h3>
            {onDelete && (
              <button
                onClick={() => onDelete(name)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {description || 'No description available'}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">Asked 2 days ago</span>
            <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded">
              Popular
            </span>
          </div>
        </div>
      );
}