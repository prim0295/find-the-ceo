import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  totalSessions: number;
  totalEvents: number;
  averageScore: number;
  completionRate: number;
  deviceBreakdown: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  levelDistribution: { [level: number]: number };
  eventBreakdown: { [eventType: string]: number };
  recentActivity: any[];
}

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/analytics/dashboard?timeRange=${timeRange}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: 20,
        textAlign: 'center',
        fontFamily: 'Comic Sans MS, Comic Sans, Comic Neue, Arial, sans-serif'
      }}>
        📊 Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: 20,
        textAlign: 'center',
        color: 'red',
        fontFamily: 'Comic Sans MS, Comic Sans, Comic Neue, Arial, sans-serif'
      }}>
        ❌ Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{
        padding: 20,
        textAlign: 'center',
        fontFamily: 'Comic Sans MS, Comic Sans, Comic Neue, Arial, sans-serif'
      }}>
        📊 No analytics data available
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      maxWidth: 1200,
      margin: '0 auto',
      fontFamily: 'Comic Sans MS, Comic Sans, Comic Neue, Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>📊 Game Analytics Dashboard</h1>
      
      {/* Time Range Selector */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value as '24h' | '7d' | '30d')}
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 8,
            border: '2px solid #FF6B6B'
          }}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 20,
        marginBottom: 30
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 20,
          borderRadius: 12,
          color: 'white',
          textAlign: 'center'
        }}>
          <h3>🎮 Total Sessions</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold' }}>{data.totalSessions}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: 20,
          borderRadius: 12,
          color: 'white',
          textAlign: 'center'
        }}>
          <h3>📈 Average Score</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold' }}>{data.averageScore}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: 20,
          borderRadius: 12,
          color: 'white',
          textAlign: 'center'
        }}>
          <h3>🏆 Completion Rate</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold' }}>{data.completionRate}%</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          padding: 20,
          borderRadius: 12,
          color: 'white',
          textAlign: 'center'
        }}>
          <h3>📱 Total Events</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold' }}>{data.totalEvents}</p>
        </div>
      </div>

      {/* Device Breakdown */}
      <div style={{ marginBottom: 30 }}>
        <h2>📱 Device Usage</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 15
        }}>
          <div style={{
            background: '#FF6B6B',
            padding: 15,
            borderRadius: 8,
            color: 'white',
            textAlign: 'center'
          }}>
            <h4>📱 Mobile</h4>
            <p style={{ fontSize: 20, fontWeight: 'bold' }}>{data.deviceBreakdown.mobile}</p>
          </div>
          <div style={{
            background: '#4ECDC4',
            padding: 15,
            borderRadius: 8,
            color: 'white',
            textAlign: 'center'
          }}>
            <h4>📱 Tablet</h4>
            <p style={{ fontSize: 20, fontWeight: 'bold' }}>{data.deviceBreakdown.tablet}</p>
          </div>
          <div style={{
            background: '#45B7D1',
            padding: 15,
            borderRadius: 8,
            color: 'white',
            textAlign: 'center'
          }}>
            <h4>💻 Desktop</h4>
            <p style={{ fontSize: 20, fontWeight: 'bold' }}>{data.deviceBreakdown.desktop}</p>
          </div>
        </div>
      </div>

      {/* Level Distribution */}
      <div style={{ marginBottom: 30 }}>
        <h2>🎯 Level Distribution</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 10
        }}>
          {Object.entries(data.levelDistribution).map(([level, count]) => (
            <div key={level} style={{
              background: '#FFE66D',
              padding: 15,
              borderRadius: 8,
              textAlign: 'center',
              border: '2px solid #FFA500'
            }}>
              <h4>Level {level}</h4>
              <p style={{ fontSize: 18, fontWeight: 'bold' }}>{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Event Breakdown */}
      <div style={{ marginBottom: 30 }}>
        <h2>📊 Event Breakdown</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 15
        }}>
          {Object.entries(data.eventBreakdown).map(([eventType, count]) => (
            <div key={eventType} style={{
              background: '#A8E6CF',
              padding: 15,
              borderRadius: 8,
              textAlign: 'center',
              border: '2px solid #4CAF50'
            }}>
              <h4>{eventType.replace('_', ' ').toUpperCase()}</h4>
              <p style={{ fontSize: 18, fontWeight: 'bold' }}>{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2>🕒 Recent Activity</h2>
        <div style={{
          maxHeight: 300,
          overflowY: 'auto',
          border: '2px solid #ddd',
          borderRadius: 8,
          padding: 15
        }}>
          {data.recentActivity.map((activity, index) => (
            <div key={index} style={{
              padding: 10,
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong>{activity.eventType}</strong> - Level {activity.gameLevel}
              </div>
              <div>
                Score: {activity.score} | {new Date(activity.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 