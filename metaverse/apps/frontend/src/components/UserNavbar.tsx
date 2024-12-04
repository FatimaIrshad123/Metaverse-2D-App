import { useState } from 'react';
import { 
  CircleHelp,
  Globe,
  CircleUserRound,
  CalendarDays,
  Sparkles,
  CirclePlus,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const navigate = useNavigate();
  
  const menuItems = [
    { 
      title: localStorage.getItem('username'),
      icon: CircleUserRound,
      dropdown: [
        { title: 'Edit character', onClick: () => {
          navigate('/updatemetadata');}},
        { title: 'SignOut',onClick: () => { localStorage.removeItem('token'),
          localStorage.removeItem('userToken'),
          localStorage.removeItem('adminToken')
          navigate('/')
        }
         },
      ]
    },
    { 
      title: 'Resources',
      icon: CircleHelp
    }
  ];

  return (
    <nav className="py-5">
      <div className="px-14">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 flex">
              <button className="text-white font-semibold flex mt-0 bg-slate-500 rounded-md p-2 px-7">
                <CalendarDays className='mt-0.5 pr-2'/>
                Events
              </button>
              <button className="text-white font-semibold flex mt-0 rounded-md p-2 px-7 ml-3" onClick={() => navigate('/allspaces')}>
              <Sparkles className='mt-0.5 pr-2'/>
                My Spaces
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => {
                const Icon = item.icon;
              return (
                <div key={item.title} className="relative group">
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-white
                      ${activeItem === item.title 
                        ? 'text-white shadow-lg' 
                        : 'text-white hover:bg-white/20'}`}
                    >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium text-white">{item.title}</span>
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 
                        group-hover:rotate-180`} 
                      />
                    )}
                  </button>

                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 text-white">
                      <div className="rounded-lg shadow-lg py-2">
                        {item.dropdown.map((dropdownItem) => {
                          return (
                            <button
                              key={dropdownItem.title}
                              className="w-full flex items-center space-x-2 px-4 py-2 transition-colors duration-200 text-white"
                              onClick={dropdownItem.onClick}
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
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-white font-medium bg-gray-400">
                <Globe className="h-4 w-5"/>
                English
            </button>

            <button className="bg-emerald-400 px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 flex" onClick={() => navigate('/CreateSpace')}>
                <CirclePlus className="h-5 w-5 mt-1"/>
                Create Space
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-3 font-medium">
              SignOut
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;