import { useState } from 'react';
import { 
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const navigate = useNavigate()
  const menuItems = [
    { 
      title: 'Product',
      dropdown: [
        { title: 'Features' },
        { title: 'Integration' },
        { title: 'Privacy & Security'},
        { title: 'Downloads'},
        { title: "What's New"}
      ]
    },
    { 
      title: 'Solutions',
      dropdown: [
        { title: 'Virtual Office'},
        { title: 'Team Meetings'},
        { title: 'Team Socials'}
      ]
    },
    { 
      title: 'Pricing',
    },
    { 
      title: 'Resources',
      dropdown: [
        { title: 'Gather Academy'},
        { title: 'Customers Stories'},
        { title: 'Blog'},
        { title: 'Office tour'},
        { title: 'Help Center'}
      ]
    },
    { 
      title: 'Contact Sales',
    },
  ];

  return (
    <nav className="bg-gradient-to-r p-2 pt-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg shadow-lg">
              <span className="text-xl font-semibold bg-gradient-to-r bg-clip-text text-white">
                Gather
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => {
              return (
                <div key={item.title} className="relative group">
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 
                      ${activeItem === item.title 
                        ? 'text-white shadow-lg' 
                        : 'text-white hover:bg-white/20'}`}
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 
                        group-hover:rotate-180`} 
                      />
                    )}
                  </button>

                  {/* Hover Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                      <div className="bg-white rounded-lg shadow-lg py-2">
                        {item.dropdown.map((dropdownItem) => {
                          return (
                            <button
                              key={dropdownItem.title}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-purple-50 transition-colors duration-200"
                            >
                              <span>{dropdownItem.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <button className=" bg-green-400 px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105" onClick={() => navigate('/signup')}>
              Get started
            </button>

            <button className=" text-blue-800 bg-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200 transform hover:scale-105" onClick={() => navigate('/signin')}>
              Sign in
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

        {/* Mobile Menu - Keeps click functionality for better mobile UX */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                return (
                  <div key={item.title} className="group">
                    <button
                      onClick={() => setActiveItem(item.title)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200
                        ${activeItem === item.title 
                          ? 'bg-white' 
                          : 'text-white hover:bg-white/20'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.dropdown && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>

                    {/* Mobile Dropdown - Shows when item is active */}
                    {item.dropdown && activeItem === item.title && (
                      <div className="mt-2 ml-4 space-y-1 border-l-2 border-white/20 pl-4">
                        {item.dropdown.map((dropdownItem) => {
                          return (
                            <button
                              key={dropdownItem.title}
                              className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200"
                            >
                              <span>{dropdownItem.title}</span>
                              
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <button className="w-full bg-green-400 px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200" onClick={() => navigate('/signup')}>
                Get Started
              </button>
              <button className="w-full bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200" onClick={() => navigate('/signin')}>
                Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;