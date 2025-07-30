import { GameEvent, IGameEvent } from '../models/GameEvent';
import mongoose from 'mongoose';

export interface AnalyticsData {
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
  recentActivity: IGameEvent[];
}

export class AnalyticsService {
  
  // Track a new game event
  static async trackEvent(eventData: Omit<IGameEvent, '_id' | 'timestamp'>): Promise<void> {
    try {
      const event = new GameEvent({
        ...eventData,
        timestamp: new Date()
      });
      await event.save();
      console.log(`📊 Event tracked: ${eventData.eventType} - Level ${eventData.gameLevel} - Score ${eventData.score}`);
    } catch (error) {
      console.error('❌ Error tracking event:', error);
    }
  }

  // Get analytics dashboard data
  static async getAnalyticsData(timeRange: '24h' | '7d' | '30d' = '7d'): Promise<AnalyticsData> {
    try {
      const startDate = this.getStartDate(timeRange);
      
      // Get total sessions
      const totalSessions = await GameEvent.distinct('sessionId', {
        timestamp: { $gte: startDate }
      }).countDocuments();

      // Get total events
      const totalEvents = await GameEvent.countDocuments({
        timestamp: { $gte: startDate }
      });

      // Get average score
      const avgScoreResult = await GameEvent.aggregate([
        { $match: { timestamp: { $gte: startDate }, eventType: 'game_end' } },
        { $group: { _id: null, avgScore: { $avg: '$score' } } }
      ]);
      const averageScore = avgScoreResult[0]?.avgScore || 0;

      // Get completion rate (qualified vs failed)
      const qualifiedCount = await GameEvent.countDocuments({
        timestamp: { $gte: startDate },
        eventType: 'game_end',
        'metadata.qualified': true
      });
      const totalGames = await GameEvent.countDocuments({
        timestamp: { $gte: startDate },
        eventType: 'game_end'
      });
      const completionRate = totalGames > 0 ? (qualifiedCount / totalGames) * 100 : 0;

      // Get device breakdown
      const deviceBreakdown = await GameEvent.aggregate([
        { $match: { timestamp: { $gte: startDate } } },
        { $group: { _id: '$metadata.deviceType', count: { $sum: 1 } } }
      ]);

      // Get level distribution
      const levelDistribution = await GameEvent.aggregate([
        { $match: { timestamp: { $gte: startDate }, eventType: 'game_end' } },
        { $group: { _id: '$gameLevel', count: { $sum: 1 } } }
      ]);

      // Get event breakdown
      const eventBreakdown = await GameEvent.aggregate([
        { $match: { timestamp: { $gte: startDate } } },
        { $group: { _id: '$eventType', count: { $sum: 1 } } }
      ]);

      // Get recent activity
      const recentActivity = await GameEvent.find({
        timestamp: { $gte: startDate }
      })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

      return {
        totalSessions,
        totalEvents,
        averageScore: Math.round(averageScore),
        completionRate: Math.round(completionRate * 100) / 100,
        deviceBreakdown: {
          mobile: deviceBreakdown.find(d => d._id === 'mobile')?.count || 0,
          tablet: deviceBreakdown.find(d => d._id === 'tablet')?.count || 0,
          desktop: deviceBreakdown.find(d => d._id === 'desktop')?.count || 0
        },
        levelDistribution: levelDistribution.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {} as { [level: number]: number }),
        eventBreakdown: eventBreakdown.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {} as { [eventType: string]: number }),
        recentActivity
      };
    } catch (error) {
      console.error('❌ Error getting analytics data:', error);
      throw error;
    }
  }

  // Get user session data
  static async getUserSession(sessionId: string): Promise<IGameEvent[]> {
    try {
      return await GameEvent.find({ sessionId })
        .sort({ timestamp: 1 })
        .lean();
    } catch (error) {
      console.error('❌ Error getting user session:', error);
      throw error;
    }
  }

  // Get leaderboard data
  static async getLeaderboard(limit: number = 10): Promise<any[]> {
    try {
      return await GameEvent.aggregate([
        { $match: { eventType: 'game_end' } },
        { $sort: { score: -1 } },
        { $limit: limit },
        {
          $project: {
            sessionId: 1,
            score: 1,
            gameLevel: 1,
            'metadata.deviceType': 1,
            timestamp: 1
          }
        }
      ]);
    } catch (error) {
      console.error('❌ Error getting leaderboard:', error);
      throw error;
    }
  }

  // Get performance metrics
  static async getPerformanceMetrics(): Promise<any> {
    try {
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const [dailyEvents, weeklyEvents] = await Promise.all([
        GameEvent.countDocuments({ timestamp: { $gte: last24h } }),
        GameEvent.countDocuments({ timestamp: { $gte: last7d } })
      ]);

      return {
        dailyEvents,
        weeklyEvents,
        databaseSize: await GameEvent.countDocuments()
      };
    } catch (error) {
      console.error('❌ Error getting performance metrics:', error);
      throw error;
    }
  }

  private static getStartDate(timeRange: '24h' | '7d' | '30d'): Date {
    const now = new Date();
    switch (timeRange) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  }
} 