import { FileText, Home, Tag, Users } from "lucide-react";
import { NavLink } from "react-router";

export default function Sidebar() {
    const menuItems = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Posts', href: '/posts', icon: FileText },
        { label: 'Tags', href: '/tags', icon: Tag },
        { label: 'Users', href: '/users', icon: Users }
      ];
    
      return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
          <div className="p-4">
            <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
              Ask Anything
            </h2>
            
            {
                menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink 
                        to={item.href}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors duration-150"
                        >
                            <Icon className="w-4 h-4 mr-3 text-gray-500" />
                            {item.label}
                        </NavLink>
                    )
                })
            }
          </div>
        </aside>
      );
}