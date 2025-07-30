import express from 'express';
import { AnalyticsService } from '../services/analyticsService';
import { GameEvent } from '../models/GameEvent';

const router = express.Router();

// Get analytics dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const timeRange = (req.query.timeRange as '24h' | '7d' | '30d') || '7d';
    const analyticsData = await AnalyticsService.getAnalyticsData(timeRange);
    
    res.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('❌ Error getting analytics dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get analytics data'
    });
  }
});

// Track a game event
router.post('/track', async (req, res) => {
  try {
    const eventData = req.body;
    
    // Validate required fields
    if (!eventData.sessionId || !eventData.eventType || !eventData.gameLevel) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId, eventType, gameLevel'
      });
    }

    await AnalyticsService.trackEvent(eventData);
    
    res.json({
      success: true,
      message: 'Event tracked successfully'
    });
  } catch (error) {
    console.error('❌ Error tracking event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track event'
    });
  }
});

// Get user session data
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionData = await AnalyticsService.getUserSession(sessionId);
    
    res.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error('❌ Error getting session data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get session data'
    });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const leaderboard = await AnalyticsService.getLeaderboard(limit);
    
    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error('❌ Error getting leaderboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get leaderboard'
    });
  }
});

// Get performance metrics
router.get('/performance', async (req, res) => {
  try {
    const metrics = await AnalyticsService.getPerformanceMetrics();
    
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('❌ Error getting performance metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get performance metrics'
    });
  }
});

// Get real-time stats
router.get('/realtime', async (req, res) => {
  try {
    const now = new Date();
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
    
    const [hourlyEvents, activeSessions] = await Promise.all([
      // Count events in last hour
      GameEvent.countDocuments({
        timestamp: { $gte: lastHour }
      }),
      // Count unique sessions in last hour
      GameEvent.distinct('sessionId', {
        timestamp: { $gte: lastHour }
      }).countDocuments()
    ]);
    
    res.json({
      success: true,
      data: {
        hourlyEvents,
        activeSessions,
        timestamp: now
      }
    });
  } catch (error) {
    console.error('❌ Error getting real-time stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get real-time stats'
    });
  }
});

export default router; 