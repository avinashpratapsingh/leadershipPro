import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useData } from '../contexts/DataContext';
import { Settings, Users, BookOpen, BarChart3, Plus, Edit, Trash2, Download, Upload } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { modules, leaderboard } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'users' | 'analytics'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'modules', label: 'Modules', icon: BookOpen },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const totalLessons = modules.reduce((acc, module) => acc + module.totalLessons, 0);
  const completedLessons = modules.reduce((acc, module) => acc + module.completedLessons, 0);

  const mockUsers = [
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh@innovatetech.in', role: 'learner', status: 'active', joinDate: '2024-01-15', progress: 65 },
    { id: '2', name: 'Anita Desai', email: 'anita@textileworld.in', role: 'learner', status: 'active', joinDate: '2024-01-10', progress: 45 },
    { id: '3', name: 'Vikram Singh', email: 'vikram@manufacturingpro.in', role: 'learner', status: 'active', joinDate: '2024-01-20', progress: 30 },
    { id: '4', name: 'Meera Patel', email: 'meera@foodprocessing.in', role: 'learner', status: 'inactive', joinDate: '2024-01-05', progress: 80 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{mockUsers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Modules</p>
              <p className="text-3xl font-bold text-gray-900">{modules.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{Math.round((completedLessons / totalLessons) * 100)}%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg. Progress</p>
              <p className="text-3xl font-bold text-gray-900">{Math.round(mockUsers.reduce((acc, user) => acc + user.progress, 0) / mockUsers.length)}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Rajesh Kumar completed "Mind Management Mastery" module</span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">New user Meera Patel registered</span>
              <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Assignment submitted for "Emotional Intelligence"</span>
              <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModules = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Module Management</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Module
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {modules.map((module) => (
              <tr key={module.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{module.title}</div>
                    <div className="text-sm text-gray-500">{module.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {module.completedLessons}/{module.totalLessons}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(module.completedLessons / module.totalLessons) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.round((module.completedLessons / module.totalLessons) * 100)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">User Management</h3>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import Users
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${user.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{user.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Module Completion Rates</h4>
          <div className="space-y-4">
            {modules.slice(0, 5).map((module) => (
              <div key={module.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">{module.title.split(' ')[0]}</span>
                  <span className="text-sm text-gray-600">
                    {Math.round((module.completedLessons / module.totalLessons) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(module.completedLessons / module.totalLessons) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Daily Active Users</span>
              <span className="text-lg font-semibold text-gray-900">28</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Weekly Active Users</span>
              <span className="text-lg font-semibold text-gray-900">45</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Monthly Active Users</span>
              <span className="text-lg font-semibold text-gray-900">78</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Avg. Session Duration</span>
              <span className="text-lg font-semibold text-gray-900">24 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'modules': return renderModules();
      case 'users': return renderUsers();
      case 'analytics': return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <Settings className="w-8 h-8 mr-3" />
                Admin Panel
              </h1>
              <p className="text-gray-200 text-lg">Manage your leadership development platform</p>
            </div>
            <div className="text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-gray-200">System Health</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-6">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;