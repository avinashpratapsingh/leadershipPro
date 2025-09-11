import React, { useState } from 'react';
import { Users, FileText, TrendingUp, Award, MessageSquare, Calendar } from 'lucide-react';

export const CoachDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('participants');

  const participants = [
    {
      id: 1,
      name: 'Arjun Mehta',
      company: 'InnovateTech Solutions',
      progress: 75,
      assignmentsSubmitted: 8,
      totalAssignments: 10,
      lastActive: '2 hours ago',
      currentModule: 'Decision-Making Mastery'
    },
    {
      id: 2,
      name: 'Anita Desai',
      company: 'Desai Textiles',
      progress: 60,
      assignmentsSubmitted: 6,
      totalAssignments: 10,
      lastActive: '1 day ago',
      currentModule: 'Communication Mastery'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      company: 'Singh Manufacturing',
      progress: 90,
      assignmentsSubmitted: 9,
      totalAssignments: 10,
      lastActive: '30 minutes ago',
      currentModule: 'Delegation Mastery'
    }
  ];

  const pendingAssignments = [
    {
      id: 1,
      participant: 'Arjun Mehta',
      module: 'Decision-Making Mastery',
      lesson: 'Strategic Decision Framework',
      submittedAt: '2 hours ago',
      type: 'Case Study Analysis'
    },
    {
      id: 2,
      participant: 'Anita Desai',
      module: 'Communication Mastery',
      lesson: 'Effective Team Communication',
      submittedAt: '1 day ago',
      type: 'Reflection Journal'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Coach Dashboard</h1>
        <p className="text-gray-600">Monitor participant progress and provide feedback</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedTab('participants')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'participants'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Participants
            </button>
            <button
              onClick={() => setSelectedTab('assignments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'assignments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Assignments
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'participants' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Participant Progress</h3>
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{participant.name}</h4>
                        <p className="text-sm text-gray-600">{participant.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Last active: {participant.lastActive}</p>
                        <p className="text-sm font-medium text-blue-600">{participant.currentModule}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{participant.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${participant.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Assignments: {participant.assignmentsSubmitted}/{participant.totalAssignments}</span>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'assignments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Assignments Awaiting Review</h3>
              <div className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{assignment.participant}</h4>
                        <p className="text-sm text-gray-600">{assignment.module} - {assignment.lesson}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Submitted: {assignment.submittedAt}</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {assignment.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <FileText className="w-4 h-4 mr-2" />
                        Review Assignment
                      </button>
                      <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Add Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};