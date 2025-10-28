import { FileText, Home, Tag, Users, User, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
    const menuItems = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Posts', href: '/posts', icon: FileText },
        { label: 'Tags', href: '/tags', icon: Tag },
        { label: 'Users', href: '/users', icon: Users }
      ];

      // const [user, setUser] = useState(null);
      const { user } = useAuth();
      const { refreshUser } = useAuth();

      const [dropdownOpen, setDropdownOpen] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
        fetch("http://localhost:5192/api/auth/me", { credentials: "include" })
          .then(res => res.json())
          .then(data => {
            // if (data.isLoggedIn) {
            //   setUser(data.userInfo);
            // }
          })
          .catch(err => console.error(err));
      }, []);

      const handleLogout = async () => {
        try {
          await fetch("http://localhost:5192/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
      
          await refreshUser(); // refresh user state in context
          navigate("/login");  // redirect to login page
        } catch (err) {
          console.error("Logout failed:", err);
        }
      };
      

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
          
          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 relative">
            {user ? (
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded w-full"
                >
                  <User className="w-4 h-4 mr-3 text-gray-500" />
                  {user.username}
                </button>

                {dropdownOpen && (
                  <div className="mt-2 bg-white border rounded shadow-md absolute left-4 w-52 z-10">
                    <NavLink
                      to="/profile"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2 text-gray-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors duration-150"
              >
                <LogIn className="w-4 h-4 mr-3 text-gray-500" />
                Sign In
              </NavLink>
            )}
          </div>
        </aside>
      );
}