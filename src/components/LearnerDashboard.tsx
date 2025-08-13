import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Clock, BookOpen, Award, TrendingUp, Calendar, Target, Trophy, Star } from 'lucide-react';

const LearnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { modules, leaderboard } = useData();

  const totalLessons = modules.reduce((acc, module) => acc + module.totalLessons, 0);
  const completedLessons = modules.reduce((acc, module) => acc + module.completedLessons, 0);
  const overallProgress = (completedLessons / totalLessons) * 100;

  const currentUser = leaderboard.find(entry => entry.name === user?.name);
  const userRank = currentUser?.rank || 0;
  const userPoints = currentUser?.totalPoints || 0;

  const progressData = [
    { name: 'Completed', value: completedLessons, color: '#10B981' },
    { name: 'Remaining', value: totalLessons - completedLessons, color: '#E5E7EB' }
  ];

  const moduleProgressData = modules.slice(0, 6).map(module => ({
    name: module.title.split(' ')[0],
    progress: (module.completedLessons / module.totalLessons) * 100
  }));

  const motivationalQuotes = [
    "Leadership is not about being in charge. It's about taking care of those in your charge.",
    "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.",
    "A leader is one who knows the way, goes the way, and shows the way.",
    "Leadership is the capacity to translate vision into reality.",
  ];

  const [currentQuote] = React.useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const recentActivity = [
    { type: 'lesson', title: 'Completed: Cognitive Biases and Decision Making', time: '2 hours ago', icon: BookOpen },
    { type: 'assignment', title: 'Submitted: Mind Management Reflection', time: '1 day ago', icon: Target },
    { type: 'achievement', title: 'Earned: Focus Champion badge', time: '3 days ago', icon: Award },
    { type: 'feedback', title: 'Received feedback on EQ Assessment', time: '5 days ago', icon: Star }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-blue-100 text-lg mb-4">Ready to continue your leadership journey?</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
              <p className="text-blue-50 italic">"{currentQuote}"</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">#{userRank}</div>
              <div className="text-blue-100">Current Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Overall Progress</p>
              <p className="text-3xl font-bold text-gray-900">{Math.round(overallProgress)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Lessons Completed</p>
              <p className="text-3xl font-bold text-gray-900">{completedLessons}/{totalLessons}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Points</p>
              <p className="text-3xl font-bold text-gray-900">{userPoints.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Time Invested</p>
              <p className="text-3xl font-bold text-gray-900">24h</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Module Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moduleProgressData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${Math.round(value as number)}%`, 'Progress']} />
              <Bar dataKey="progress" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Progress Pie */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Overall Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={progressData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-gray-900">{Math.round(overallProgress)}%</p>
            <p className="text-gray-600">Complete</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Modules */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Continue Learning</h3>
          <div className="space-y-4">
            {modules.slice(0, 3).map((module) => (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    <div className="flex items-center mt-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(module.completedLessons / module.totalLessons) * 100}%` }}
                        />
                      </div>
                      <span className="ml-3 text-sm text-gray-500">
                        {module.completedLessons}/{module.totalLessons}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'lesson' ? 'bg-blue-100' :
                    activity.type === 'assignment' ? 'bg-green-100' :
                    activity.type === 'achievement' ? 'bg-yellow-100' : 'bg-purple-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      activity.type === 'lesson' ? 'text-blue-600' :
                      activity.type === 'assignment' ? 'text-green-600' :
                      activity.type === 'achievement' ? 'text-yellow-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/leaderboard"
            className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 hover:shadow-md transition-all group"
          >
            <Trophy className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform" />
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900">View Leaderboard</h4>
              <p className="text-sm text-gray-600">Check your ranking</p>
            </div>
          </Link>

          <button className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all group">
            <Calendar className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900">Schedule Session</h4>
              <p className="text-sm text-gray-600">Book with coach</p>
            </div>
          </button>

          <button className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all group">
            <Target className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900">Set Goals</h4>
              <p className="text-sm text-gray-600">Define objectives</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;