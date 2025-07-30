# 📊 Spot the CEO - Analytics & Monitoring System

## 🎯 Overview

This analytics system provides comprehensive tracking and monitoring for the "Spot the CEO" game, including user behavior, game performance, and real-time metrics.

## 🏗️ Architecture

### Backend Components
- **MongoDB Database**: Stores game events and user sessions
- **Express.js API**: RESTful endpoints for analytics data
- **Mongoose Models**: Structured data schemas
- **Analytics Service**: Business logic for data processing

### Frontend Components
- **Analytics Service**: Client-side event tracking
- **Analytics Dashboard**: Real-time metrics visualization
- **Device Detection**: Responsive analytics collection

## 📊 Data Model

### GameEvent Schema
```typescript
{
  sessionId: string;           // Unique session identifier
  userId?: string;             // Optional user ID (for future auth)
  eventType: string;           // Type of game event
  gameLevel: number;           // Current game level
  score: number;               // Current score
  stats: {                     // Game statistics
    correctClicks: number;
    wrongClicks: number;
    memesCaught: number;
  };
  metadata: {                  // Device and session info
    deviceType: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    screenResolution: string;
    timeSpent: number;
    ceoInterval: number;
    qualified: boolean;
  };
  timestamp: Date;             // Event timestamp
  ipAddress?: string;          // User IP (optional)
  userAgent?: string;          // Browser info (optional)
}
```

## 🎮 Event Types

| Event | Description | Triggered When |
|-------|-------------|----------------|
| `game_start` | Game session begins | User starts a new game |
| `game_end` | Game session ends | Timer runs out or user quits |
| `correct_click` | Correct CEO/mistress found | User clicks on correct target |
| `wrong_click` | Wrong target clicked | User clicks on wrong location |
| `level_complete` | Level successfully completed | User qualifies for next level |
| `level_fail` | Level failed | User doesn't meet qualification score |
| `share_score` | Score shared on social media | User shares their score |
| `session_abandon` | Session abandoned | User leaves without completing |

## 🚀 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

#### Environment Variables
Create `.env` file in backend directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/spot-the-ceo
```

#### Start Backend Server
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### 2. Frontend Integration

The analytics service is automatically integrated into the game components. Events are tracked when:

- **GameScreen**: `onStart`, `onGameEnd`, `onCorrectClick`, `onWrongClick`
- **ResultScreen**: `onLevelComplete`, `onLevelFail`, `onShareScore`

### 3. MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 📈 Analytics Dashboard

### Access Dashboard
Navigate to `/analytics` in your app to view the real-time dashboard.

### Dashboard Features
- **Real-time Metrics**: Live updates of game statistics
- **Time Range Filtering**: 24h, 7d, 30d views
- **Device Breakdown**: Mobile, tablet, desktop usage
- **Level Distribution**: Performance across difficulty levels
- **Event Tracking**: Detailed event breakdown
- **Recent Activity**: Latest game sessions

### Key Metrics
- **Total Sessions**: Number of game sessions started
- **Average Score**: Mean score across all sessions
- **Completion Rate**: Percentage of qualified sessions
- **Device Usage**: Distribution across device types
- **Level Performance**: Success rates per level

## 🔧 API Endpoints

### Analytics Endpoints
```
GET  /api/analytics/dashboard     # Get dashboard data
POST /api/analytics/track         # Track game event
GET  /api/analytics/session/:id   # Get session data
GET  /api/analytics/leaderboard   # Get top scores
GET  /api/analytics/performance   # Get system metrics
GET  /api/analytics/realtime      # Get real-time stats
```

### Health Check
```
GET  /health                      # Server health status
```

## 📱 Device Detection

The system automatically detects and tracks:
- **Device Type**: Mobile, tablet, desktop
- **Browser**: Chrome, Firefox, Safari, Edge
- **Screen Resolution**: Device screen dimensions
- **Orientation**: Landscape/portrait

## 🎯 Performance Monitoring

### Real-time Metrics
- **Hourly Events**: Events in last hour
- **Active Sessions**: Current active sessions
- **Database Size**: Total events stored
- **Response Times**: API performance

### Database Indexes
Optimized indexes for fast queries:
- `sessionId` (for session lookups)
- `eventType` (for event filtering)
- `gameLevel` (for level analysis)
- `timestamp` (for time-based queries)
- `metadata.deviceType` (for device analysis)

## 🔍 Query Examples

### Get Recent Sessions
```javascript
// Get sessions from last 24 hours
const sessions = await GameEvent.find({
  timestamp: { $gte: new Date(Date.now() - 24*60*60*1000) }
});
```

### Get Level Performance
```javascript
// Get completion rate for level 3
const level3Stats = await GameEvent.aggregate([
  { $match: { gameLevel: 3, eventType: 'game_end' } },
  { $group: { 
    _id: null, 
    total: { $sum: 1 },
    qualified: { $sum: { $cond: ['$metadata.qualified', 1, 0] } }
  }}
]);
```

### Get Device Breakdown
```javascript
// Get device usage distribution
const deviceStats = await GameEvent.aggregate([
  { $group: { 
    _id: '$metadata.deviceType', 
    count: { $sum: 1 } 
  }}
]);
```

## 🛠️ Development

### Adding New Events
1. Update `GameEvent` schema in `backend/src/models/GameEvent.ts`
2. Add event type to analytics service
3. Update frontend tracking in relevant components
4. Add dashboard visualization if needed

### Custom Analytics
```typescript
// Track custom event
await analytics.trackCustomEvent({
  eventType: 'custom_event',
  gameLevel: 1,
  score: 500,
  customData: { /* your data */ }
});
```

## 🔒 Privacy & Security

### Data Collection
- **Anonymous Sessions**: No personal data collected
- **Session-based**: Events tied to session ID only
- **Optional IP**: IP tracking disabled by default
- **GDPR Compliant**: Minimal data collection

### Data Retention
- **Configurable**: Set retention periods in MongoDB
- **Automatic Cleanup**: Old events can be archived
- **Export Capability**: Data export for analysis

## 📊 Monitoring & Alerts

### Health Checks
- **Database Connection**: MongoDB connectivity
- **API Response Time**: Endpoint performance
- **Error Rates**: Failed requests tracking
- **Event Volume**: Expected event counts

### Alerts (Future Implementation)
- **High Error Rate**: >5% failed requests
- **Low Activity**: <10 events/hour
- **Database Issues**: Connection failures
- **Performance**: Response time >2s

## 🚀 Deployment

### Environment Variables
```env
# Production
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/spot-the-ceo
CORS_ORIGIN=https://yourdomain.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 4000
CMD ["npm", "start"]
```

## 📈 Future Enhancements

### Planned Features
- **Real-time Charts**: Live updating visualizations
- **User Segmentation**: Advanced user analytics
- **A/B Testing**: Feature flag analytics
- **Predictive Analytics**: Score prediction models
- **Export Tools**: Data export functionality
- **Custom Dashboards**: User-defined metrics

### Advanced Analytics
- **Heat Maps**: Click pattern analysis
- **User Journeys**: Session flow tracking
- **Performance Metrics**: Load time tracking
- **Error Tracking**: Detailed error analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add analytics tracking
4. Update documentation
5. Submit pull request

## 📞 Support

For analytics system issues:
- Check MongoDB connection
- Verify API endpoints
- Review event tracking logs
- Monitor dashboard metrics

---

**🎮 Happy Gaming & Analytics! 📊** 