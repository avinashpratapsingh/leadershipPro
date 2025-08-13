import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { useDropzone } from 'react-dropzone';
import { Play, FileText, Upload, CheckCircle, ArrowLeft, Download, MessageSquare, Save } from 'lucide-react';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { getLesson, updateLessonProgress, submitAssignment } = useData();
  const [notes, setNotes] = useState('');
  const [assignmentText, setAssignmentText] = useState('');
  
  const lesson = getLesson(lessonId!);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log('Files uploaded:', acceptedFiles);
    }
  });

  if (!lesson) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">Lesson not found</h2>
            <p className="text-gray-600 mt-2">The requested lesson could not be found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmitAssignment = () => {
    if (assignmentText.trim()) {
      submitAssignment(lessonId!, assignmentText);
      setAssignmentText('');
    }
  };

  const handleProgressUpdate = (progress: number) => {
    updateLessonProgress(lessonId!, progress);
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to={`/module/${lesson.moduleId}`} className="hover:text-blue-600 transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Module
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                    <p className="text-gray-300">Video lesson placeholder</p>
                    <button 
                      onClick={() => handleProgressUpdate(100)}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{lesson.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Personal Notes
                </h3>
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes during the lesson..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Assignment Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Assignment Submission
              </h3>
              
              {lesson.assignment.status === 'reviewed' && lesson.assignment.feedback && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">
                      Assignment Reviewed - Score: {lesson.assignment.score}/100
                    </span>
                  </div>
                  <p className="text-green-700">{lesson.assignment.feedback}</p>
                </div>
              )}

              {lesson.assignment.status === 'submitted' && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <Upload className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-800">Assignment submitted, awaiting review</span>
                  </div>
                </div>
              )}

              {lesson.assignment.status === 'not-started' && (
                <div className="space-y-4">
                  <textarea
                    value={assignmentText}
                    onChange={(e) => setAssignmentText(e.target.value)}
                    placeholder="Write your assignment response here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />

                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {isDragActive
                        ? 'Drop the files here...'
                        : 'Drag & drop assignment files here, or click to select'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX files only</p>
                  </div>

                  <button
                    onClick={handleSubmitAssignment}
                    disabled={!assignmentText.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Assignment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{lesson.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(lesson.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.progress === 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lesson.progress === 100 ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Materials
              </h3>
              <div className="space-y-2">
                {lesson.materials.map((material, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <span className="text-sm font-medium text-gray-900">{material}</span>
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Section (if available) */}
            {lesson.quiz && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz</h3>
                <p className="text-gray-600 mb-4">Test your understanding of this lesson</p>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Take Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LessonPage;