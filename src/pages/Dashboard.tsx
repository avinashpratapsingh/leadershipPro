import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import LearnerDashboard from '../components/LearnerDashboard';
import { CoachDashboard } from '../components/CoachDashboard';
import { AdminPanel } from '../components/AdminPanel';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'learner':
        return <LearnerDashboard />;
      case 'coach':
        return <CoachDashboard />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <LearnerDashboard />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Dashboard;