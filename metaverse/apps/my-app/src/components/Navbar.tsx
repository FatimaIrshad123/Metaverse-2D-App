import { useState } from 'react';
import { 
  Home,
  Users,
  MessageSquare,
  Settings,
  Heart,
  Menu,
  X,
  ChevronDown,
  Gamepad,
  User,
  UserPlus,
  Globe,
  Mail,
  HelpCircle,
  Book
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { 
      title: 'Home',
      icon: Home
    },
    { 
      title: 'Friends',
      icon: Users,
      dropdown: [
        { title: 'Find Friends', icon: UserPlus },
        { title: 'My Profile', icon: User },
        { title: 'Friend Requests', icon: Mail }
      ]
    },
    { 
      title: 'Spaces',
      icon: Globe,
      dropdown: [
        { title: 'Join Game', icon: Gamepad },
        { title: 'Create Space', icon: Globe },
        { title: 'Browse Spaces', icon: Book }
      ]
    },
    { 
      title: 'Support',
      icon: Heart,
      dropdown: [
        { title: 'Help Center', icon: HelpCircle },
        { title: 'Contact Us', icon: MessageSquare },
        { title: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <nav className="bg-gradient-to-r p-2">
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
            <button className=" text-blue-800 bg-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200 transform hover:scale-105">
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
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group">
                    <button
                      onClick={() => setActiveItem(item.title)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200
                        ${activeItem === item.title 
                          ? 'bg-white text-purple-600' 
                          : 'text-white hover:bg-white/20'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
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
                          const DropdownIcon = dropdownItem.icon;
                          return (
                            <button
                              key={dropdownItem.title}
                              className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200"
                            >
                              <DropdownIcon className="h-4 w-4" />
                              <span>{dropdownItem.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-800 px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200">
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { 
      title: 'Home',
      icon: Home
    },
    { 
      title: 'Friends',
      icon: Users,
      dropdown: [
        { title: 'Find Friends', icon: UserPlus },
        { title: 'My Profile', icon: User },
        { title: 'Friend Requests', icon: Mail }
      ]
    },
    { 
      title: 'Spaces',
      icon: Globe,
      dropdown: [
        { title: 'Join Game', icon: Gamepad },
        { title: 'Create Space', icon: Globe },
        { title: 'Browse Spaces', icon: Book }
      ]
    },
    { 
      title: 'Support',
      icon: Heart,
      dropdown: [
        { title: 'Help Center', icon: HelpCircle },
        { title: 'Contact Us', icon: MessageSquare },
        { title: 'Settings', icon: Settings }
      ]
    }
  ];

  /*const handleDropdownClick = (title) => {
    if (openDropdown === title) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(title);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
*/
  return (
    <nav className="bg-gradient-to-r p-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg shadow-lg">
              <span className="text-xl font-semibold bg-gradient-to-r  text-white bg-clip-text text-transparent">
                Gather
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative">
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 
                      ${activeItem === item.title 
                        ? 'text-white shadow-lg' 
                        : 'text-white hover:bg-white/20'}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 group-hover:rotate-180 
                        `} 
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                      <div className="bg-white rounded-lg shadow-lg py-2">
                        {item.dropdown.map((dropdownItem) => {
                          const DropdownIcon = dropdownItem.icon;
                          return (
                            <button
                              key={dropdownItem.title}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                            >
                              <DropdownIcon className="h-4 w-4" />
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
               
            <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200 transform hover:scale-105">
              Sign in
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
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
                  <div key={item.title}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownClick(item.title);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200
                        ${activeItem === item.title 
                          ? 'bg-white text-purple-600' 
                          : 'text-white hover:bg-white/20'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.dropdown && (
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 
                          ${openDropdown === item.title ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </button>

                    {/* Mobile Dropdown */}
                    {item.dropdown && openDropdown === item.title && (
                      <div className="mt-2 ml-4 space-y-1 border-l-2 border-white/20 pl-4">
                        {item.dropdown.map((dropdownItem) => {
                          const DropdownIcon = dropdownItem.icon;
                          return (
                            <button
                              key={dropdownItem.title}
                              className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200"
                            >
                              <DropdownIcon className="h-4 w-4" />
                              <span>{dropdownItem.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-800 px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200">
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


const Navbar1 = () => {
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
    <nav className="bg-gradient-to-r p-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg shadow-lg">
              <span className="text-xl font-semibold bg-gradient-to-r text-white bg-clip-text text-transparent">
                Gather
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
              <button className="w-full bg-white text-blue-700 px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200">
                Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

//export default Navbar;