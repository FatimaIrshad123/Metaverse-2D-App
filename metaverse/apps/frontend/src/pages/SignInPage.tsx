import { useState } from 'react';
import { AlertCircle, User, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { BACKENDURL } from '../url';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };
  function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const decoded = jwtDecode(token);
      console.log(decoded)
      if (decoded.role === 'admin'){
          localStorage.setItem('adminToken',token)
          localStorage.setItem('adminId',decoded.userId)
        } if(decoded.role === 'User') {
          localStorage.setItem('userToken',token)
          localStorage.setItem('userId',decoded.userId)
        }
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    getUserRole();
    try {
        const response = await axios.post(`${BACKENDURL}/api/v1/signin`, {
            username: formData.username,
            password: formData.password,
          });
          
          setSuccess('Signed in successfully!');
          setFormData({
            username: '',
            password: '',
          });

          localStorage.setItem('token',response.data.token);
          localStorage.setItem('username',formData.username);
          localStorage.setItem('userToken',response.data.token)
          navigate('/UserDashboard')
    } catch (err:any) {
      setError(err.message || 'An error occurred during signin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" style={{
      backgroundImage: "url('/bg3.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-semibold text-gray-900">
            Welcome Back
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <label htmlFor="username" className='text-gray-600 pl-2'>Username</label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="appearance-none relative block w-full pl-3 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg sm:text-sm transition-colors duration-200"
                placeholder="Enter your username"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <label htmlFor="username" className='text-gray-600 pl-2'>Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none relative block w-full pl-3 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg sm:text-sm transition-colors duration-200"
                placeholder="Enter your Password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight className={`h-5 w-5 text-blue-200 ${isLoading ? 'animate-spin' : 'group-hover:translate-x-1 transition-transform duration-200'}`} />
              </span>
              {isLoading ? 'Loging in...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-green-600 hover:text-blue-500 transition-colors duration-200">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;