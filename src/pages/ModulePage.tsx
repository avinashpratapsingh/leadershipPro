import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { Play, FileText, CheckCircle, Clock, Calendar, ArrowRight } from 'lucide-react';

const ModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { getModule } = useData();
  
  const module = getModule(moduleId!);

  if (!module) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">Module not found</h2>
            <p className="text-gray-600 mt-2">The requested module could not be found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'text-green-600 bg-green-100';
      case 'submitted': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'reviewed': return 'Reviewed';
      case 'submitted': return 'Submitted';
      default: return 'Not Started';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Module Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
              <p className="text-blue-100 text-lg mb-4">{module.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>{module.totalLessons} Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{module.completedLessons} Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>~{module.totalLessons * 45} minutes</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">
                  {Math.round((module.completedLessons / module.totalLessons) * 100)}%
                </div>
                <div className="text-blue-100">Complete</div>
                <div className="w-24 bg-white/20 rounded-full h-2 mt-3">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(module.completedLessons / module.totalLessons) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Lessons</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lesson Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {module.lessons.map((lesson, index) => (
                  <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(lesson.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Play className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                          <div className="text-sm text-gray-500">{lesson.duration} minutes</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{lesson.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lesson.assignment.status)}`}>
                        {getStatusText(lesson.assignment.status)}
                        {lesson.assignment.score && (
                          <span className="ml-1">({lesson.assignment.score}/100)</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/lesson/${lesson.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {lesson.progress === 100 ? 'Review' : 'Start'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
                
                {/* Placeholder lessons */}
                {Array.from({ length: Math.max(0, module.totalLessons - module.lessons.length) }, (_, index) => (
                  <tr key={`placeholder-${index}`} className="opacity-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        Coming Soon
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Play className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-400">Lesson {module.lessons.length + index + 1}</div>
                          <div className="text-sm text-gray-400">45 minutes</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-gray-300 h-2 rounded-full w-0" />
                        </div>
                        <span className="text-sm font-medium text-gray-400">0%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-400 bg-gray-100">
                        Locked
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">Locked</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModulePage;