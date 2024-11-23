import { useState } from 'react';
import { 
  Home,
  Users,
  MessageSquare,
  Settings,
  Heart,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { title: 'Home', icon: Home },
    { title: 'Friends', icon: Users },
    { title: 'Chat', icon: MessageSquare },
    { title: 'Settings', icon: Settings },
    { title: 'Support', icon: Heart }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 p-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                VIRTUAL SPACE
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => setActiveItem(item.title)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 
                    ${activeItem === item.title 
                      ? 'bg-white text-purple-600 shadow-lg' 
                      : 'text-white hover:bg-white/20'}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200 transform hover:scale-105">
              Join Game
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/20 p-2 rounded-lg"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    onClick={() => {
                      setActiveItem(item.title);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                      ${activeItem === item.title 
                        ? 'bg-white text-purple-600' 
                        : 'text-white hover:bg-white/20'}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </button>
                );
              })}
              <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-800 px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200">
                Join Game
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;