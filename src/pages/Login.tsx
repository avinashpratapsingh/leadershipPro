import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('learner');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'learner', email: 'rajesh@innovatetech.in', name: 'Rajesh Kumar (CEO)' },
    { role: 'coach', email: 'priya@leadershipguru.in', name: 'Priya Sharma (Coach)' },
    { role: 'admin', email: 'admin@platform.in', name: 'Admin User' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Panel - Branding */}
        <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">LeadershipPro</h1>
                <p className="text-blue-100">Development Platform</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Transform Your Leadership Journey</h2>
              <p className="text-blue-100 leading-relaxed">
                Join thousands of executives and leaders who have accelerated their growth through our 
                comprehensive leadership development program.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-blue-50">11 Comprehensive Leadership Modules</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-blue-50">Interactive Learning & Progress Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-blue-50">Peer Competition & Gamification</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-blue-50">Expert Coach Feedback & Mentorship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 p-12">
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600">Sign in to continue your leadership journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['learner', 'coach', 'admin'].map((roleOption) => (
                    <button
                      key={roleOption}
                      type="button"
                      onClick={() => setRole(roleOption)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        role === roleOption
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <User className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs font-medium capitalize">{roleOption}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h4>
              <div className="space-y-2">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.role}
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword('demo123');
                      setRole(cred.role);
                    }}
                    className="w-full text-left text-xs text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <strong>{cred.name}</strong> - {cred.email}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;