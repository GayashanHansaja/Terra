import { useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import LoginForm from './Login';
import RegisterForm from './Register';
import { useAuth } from '../context/AuthContext';

export default function ProfileMenu() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const { currentUser, logout } = useAuth();

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowMenu(false);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowMenu(false);
  };
  
  const handleLogout = async () => {
    await logout();
    setShowMenu(false);
  };

  return (
    <div className="relative flex justify-end">
      <button 
        onClick={() => {
          if (currentUser) {
            setShowMenu(!showMenu);
            setShowLogin(false);
            setShowRegister(false);
          } else {
            setShowLogin(!showLogin);
            setShowRegister(false);
            setShowMenu(false);
          }
        }} 
        className="flex items-center h-12 justify-end rounded-full hover:bg-white/10 transition duration-200"
      >
        {currentUser ? (
          <div className="flex items-center bg-gray-800/70 rounded-full px-3 py-1 border border-purple-500/30">
            <FaUserCircle className="text-2xl text-purple-400 mr-2" />
            <span className="text-white">{currentUser.username}</span>
          </div>
        ) : (
          <div className="h-12 w-12 flex items-center justify-center">
            <FaUserCircle className="text-3xl text-white hover:text-purple-400" />
          </div>
        )}
      </button>
      
      {/* User menu dropdown */}
      {showMenu && currentUser && (
        <div className="absolute right-0 top-12 w-48 bg-gray-900/90 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-lg z-50">
          <div className="p-3 border-b border-purple-500/20">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="font-medium text-white">{currentUser.username}</p>
          </div>
          
          <div className="p-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-white hover:bg-purple-900/30 rounded-md"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
      
      {/* Login form */}
      {showLogin && !currentUser && (
        <div className="absolute right-0 top-12 rounded-lg shadow-lg p-4 z-50">
          <LoginForm 
            onSwitch={() => {
              setShowLogin(false);
              setShowRegister(true);
            }} 
            onSuccess={handleLoginSuccess}
          />
        </div>
      )}
      
      {/* Register form */}
      {showRegister && !currentUser && (
        <div className="absolute right-0 top-12 rounded-lg shadow-lg p-4 z-50">
          <RegisterForm 
            onSwitch={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
            onSuccess={handleRegisterSuccess}
          />
        </div>
      )}
    </div>
  );
}
