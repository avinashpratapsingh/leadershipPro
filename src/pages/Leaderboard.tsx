import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Medal, Award, TrendingUp, Calendar, User } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { leaderboard } = useData();
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'total'>('total');

  const getSortedLeaderboard = () => {
    return [...leaderboard].sort((a, b) => {
      switch (timeFilter) {
        case 'weekly':
          return b.weeklyPoints - a.weeklyPoints;
        case 'monthly':
          return b.monthlyPoints - a.monthlyPoints;
        default:
          return b.totalPoints - a.totalPoints;
      }
    }).map((entry, index) => ({ ...entry, rank: index + 1 }));
  };

  const sortedLeaderboard = getSortedLeaderboard();
  const currentUserEntry = sortedLeaderboard.find(entry => entry.name === user?.name);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-sm font-bold text-gray-600">{rank}</div>;
    }
  };

  const getPoints = (entry: any) => {
    switch (timeFilter) {
      case 'weekly':
        return entry.weeklyPoints;
      case 'monthly':
        return entry.monthlyPoints;
      default:
        return entry.totalPoints;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <Trophy className="w-8 h-8 mr-3" />
                Leaderboard
              </h1>
              <p className="text-yellow-100 text-lg">Compete, Learn, and Excel Together</p>
            </div>
            <div className="text-right">
              {currentUserEntry && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">#{currentUserEntry.rank}</div>
                  <div className="text-yellow-100">Your Rank</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Time Filter */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Rankings</h2>
            <div className="flex space-x-2">
              {[
                { key: 'weekly', label: 'Weekly', icon: Calendar },
                { key: 'monthly', label: 'Monthly', icon: TrendingUp },
                { key: 'total', label: 'All Time', icon: Trophy }
              ].map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.key}
                    onClick={() => setTimeFilter(filter.key as any)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      timeFilter === filter.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {sortedLeaderboard.slice(0, 3).map((entry, index) => (
              <div
                key={entry.id}
                className={`relative p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                  entry.name === user?.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                } ${
                  index === 0 ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100' :
                  index === 1 ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100' :
                  'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100'
                }`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${getRankBadgeColor(entry.rank)}`}>
                    {getRankIcon(entry.rank)}
                  </div>
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg"
                  />
                  <h3 className="font-bold text-gray-900 mb-1">{entry.name}</h3>
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {getPoints(entry).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Points</p>
                  
                  {entry.badges.length > 0 && (
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      {entry.badges.slice(0, 2).map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Full Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedLeaderboard.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      entry.name === user?.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(entry.rank)}
                        <span className="ml-3 font-medium text-gray-900">#{entry.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {entry.name}
                            {entry.name === user?.name && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {getPoints(entry).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {timeFilter === 'weekly' ? 'This week' :
                         timeFilter === 'monthly' ? 'This month' : 'Total'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {entry.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">+{Math.floor(Math.random() * 50) + 10}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Participants</p>
                <p className="text-3xl font-bold text-gray-900">{leaderboard.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average Points</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(leaderboard.reduce((acc, entry) => acc + entry.totalPoints, 0) / leaderboard.length).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Top Score</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.max(...leaderboard.map(entry => entry.totalPoints)).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;