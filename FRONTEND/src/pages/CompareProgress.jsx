// In src/pages/CompareProgress.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/operations/apiconnector';
import { profileEndpoints } from '../services/operations/apis';
import Spinner from '../components/common/Spinner';
import { FaTrophy, FaChartLine, FaUsers } from 'react-icons/fa';

const CompareProgress = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await apiConnector("GET", profileEndpoints.GET_STUDENT_ANALYTICS_API, null, {
          Authorization: `Bearer ${token}`,
        });
        if (response.data.success) {
          setAnalyticsData(response.data.data);
        }
      } catch (error) {
        console.error("Could not fetch student analytics.", error);
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, [token]);

  if (loading) {
    return <div className="grid min-h-[calc(100vh-10rem)] place-items-center"><Spinner /></div>;
  }
  
  if (!analyticsData) {
    return <div className="text-center p-8">Could not load analytics data.</div>;
  }

  return (
    <div className="text-espresso-brown w-full max-w-4xl mx-auto py-10 px-4 space-y-12">
      <h1 className="text-3xl font-bold">Your Progress & Comparison</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-warm-stone/10 p-6 rounded-lg text-center shadow-md">
          <p className="text-sm text-espresso-brown/80">Your Rank</p>
          <p className="text-5xl font-bold text-burnt-sienna mt-2">{analyticsData.currentUser.rank}</p>
        </div>
        <div className="bg-warm-stone/10 p-6 rounded-lg text-center shadow-md">
          <p className="text-sm text-espresso-brown/80">Your Score</p>
          <p className="text-5xl font-bold text-burnt-sienna mt-2">{analyticsData.currentUser.score}%</p>
        </div>
      
        <div className="bg-warm-stone/10 p-6 rounded-lg text-center shadow-md">
          <p className="text-sm text-espresso-brown/80">Active Students (24h)</p>
          <p className="text-5xl font-bold text-warm-stone mt-2">{analyticsData.activeUsersToday}</p>
        </div>
      </div>

      
      <div>
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="bg-warm-stone/10 rounded-lg shadow-md overflow-hidden">
          {analyticsData.leaderboard.map((student, index) => (
            <div 
              key={student.userId} 
              className={`
                flex items-center p-4 gap-4 
                ${index !== analyticsData.leaderboard.length - 1 ? 'border-b border-warm-stone/20' : ''}
                ${student.userId === user._id ? 'bg-rose-gold/20' : ''}
              `}
            >
              <span className="font-bold w-8">{index + 1}</span>
              <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
              <p className="font-medium flex-1">{student.name}</p>
              <p className="font-bold text-burnt-sienna">{student.score}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareProgress;