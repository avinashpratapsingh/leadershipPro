import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Users, Upload, Download, Plus, Edit, Trash2, Video, FileText, BarChart3 } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: string[];
  } | null>(null);

  // Mock data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'learner', status: 'active', progress: 75, joinDate: '2024-01-15', company: 'Tech Corp' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'coach', status: 'active', progress: 100, joinDate: '2024-01-10', company: 'Innovation Inc' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'learner', status: 'inactive', progress: 45, joinDate: '2024-01-20', company: 'StartupXYZ' },
  ];

  const videos = [
    { id: 1, title: 'Leadership Fundamentals', module: 'Module 1', duration: '15:30', size: '245 MB', status: 'active', uploadDate: '2024-01-15' },
    { id: 2, title: 'Team Communication', module: 'Module 2', duration: '22:15', size: '387 MB', status: 'processing', uploadDate: '2024-01-14' },
    { id: 3, title: 'Decision Making', module: 'Module 3', duration: '18:45', size: '298 MB', status: 'active', uploadDate: '2024-01-13' },
  ];

  const handleExportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'Progress', 'Join Date', 'Company'],
      ...users.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        `${user.progress}%`,
        user.joinDate,
        user.company
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadSample = () => {
    const sampleData = [
      ['Name', 'Email', 'Role', 'Status', 'Progress', 'Join Date', 'Company'],
      ['John Doe', 'john@example.com', 'learner', 'active', '75', '2024-01-15', 'Tech Corp'],
      ['Jane Smith', 'jane@example.com', 'coach', 'active', '100', '2024-01-10', 'Innovation Inc'],
      ['Mike Johnson', 'mike@example.com', 'admin', 'active', '90', '2024-01-12', 'StartupXYZ']
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setImportFile(file);
    }
  };

  const processImport = async () => {
    if (!importFile) return;

    setImportProgress(0);
    setImportResults(null);

    // Simulate file processing
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
      
      const errors: string[] = [];
      let successCount = 0;

      // Validate headers
      const requiredHeaders = ['Name', 'Email', 'Role'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
      }

      // Process each row
      for (let i = 1; i < lines.length; i++) {
        setImportProgress((i / (lines.length - 1)) * 100);
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate processing time

        const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // Validate row
        if (!row.Name) {
          errors.push(`Row ${i + 1}: Name is required`);
          continue;
        }
        if (!row.Email || !row.Email.includes('@')) {
          errors.push(`Row ${i + 1}: Valid email is required`);
          continue;
        }
        if (!['learner', 'coach', 'admin'].includes(row.Role?.toLowerCase())) {
          errors.push(`Row ${i + 1}: Role must be learner, coach, or admin`);
          continue;
        }

        successCount++;
      }

      setImportResults({ success: successCount, errors });
    };

    reader.readAsText(importFile);
  };

  const handleVideoUpload = () => {
    // Simulate video upload process
    setShowVideoModal(false);
    // In a real implementation, this would handle the actual file upload
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users, content, and system settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'users', label: 'Users', icon: Users },
              { id: 'videos', label: 'Videos', icon: Video },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Import/Export Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Users
                </button>
                <button
                  onClick={handleExportUsers}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Users
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Users</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'coach' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${user.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{user.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
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
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Video Management</h2>
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Video
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {videos.map((video) => (
                      <tr key={video.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                              <Video className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{video.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.module}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            video.status === 'active' ? 'bg-green-100 text-green-800' :
                            video.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {video.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
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
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Video className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Videos</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">78%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Import Users</h3>
                  <button
                    onClick={() => {
                      setShowImportModal(false);
                      setImportFile(null);
                      setImportProgress(0);
                      setImportResults(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Import Instructions</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p><strong>Step 1:</strong> Download the sample CSV template below</p>
                    <p><strong>Step 2:</strong> Fill in your user data following the format</p>
                    <p><strong>Step 3:</strong> Upload your completed CSV file</p>
                    
                    <div className="mt-3">
                      <p className="font-medium">Required Columns:</p>
                      <ul className="list-disc list-inside ml-2">
                        <li>Name (text)</li>
                        <li>Email (valid email format)</li>
                        <li>Role (learner, coach, or admin)</li>
                      </ul>
                    </div>
                    
                    <div className="mt-2">
                      <p className="font-medium">Optional Columns:</p>
                      <ul className="list-disc list-inside ml-2">
                        <li>Status (active or inactive, defaults to active)</li>
                        <li>Progress (0-100, defaults to 0)</li>
                        <li>Join Date (YYYY-MM-DD format)</li>
                        <li>Company (text)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sample Template Download */}
                <div className="mb-6">
                  <button
                    onClick={handleDownloadSample}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample CSV Template
                  </button>
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CSV File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {importFile ? importFile.name : 'Click to select CSV file or drag and drop'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Progress Bar */}
                {importProgress > 0 && importProgress < 100 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Processing...</span>
                      <span>{Math.round(importProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${importProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Results */}
                {importResults && (
                  <div className="mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-green-800 font-medium">
                        Successfully processed {importResults.success} users
                      </p>
                    </div>
                    
                    {importResults.errors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 font-medium mb-2">
                          {importResults.errors.length} errors found:
                        </p>
                        <ul className="text-sm text-red-700 space-y-1">
                          {importResults.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowImportModal(false);
                      setImportFile(null);
                      setImportProgress(0);
                      setImportResults(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={processImport}
                    disabled={!importFile || importProgress > 0}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {importProgress > 0 ? 'Processing...' : 'Import Users'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Upload Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Upload Video</h3>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter video title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Module
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Select Module</option>
                      <option>Module 1</option>
                      <option>Module 2</option>
                      <option>Module 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to select video file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        MP4, MOV, AVI up to 2GB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVideoUpload}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Upload Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};