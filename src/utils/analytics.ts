import { getDeviceType, getScreenDimensions } from './deviceDetection';

// Add environment type declaration
declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_API_URL?: string;
    };
  }
}

export interface GameEventData {
  sessionId: string;
  eventType: 'game_start' | 'game_end' | 'correct_click' | 'wrong_click' | 'level_complete' | 'level_fail' | 'share_score' | 'session_abandon';
  gameLevel: number;
  score: number;
  stats: {
    correctClicks: number;
    wrongClicks: number;
    memesCaught: number;
  };
  metadata: {
    deviceType: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    screenResolution: string;
    timeSpent: number;
    ceoInterval: number;
    qualified: boolean;
  };
}

class AnalyticsService {
  private sessionId: string;
  private startTime: number;
  private apiBaseUrl: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    // Use production URL when deployed, localhost for development
    this.apiBaseUrl = import.meta.env.VITE_API_URL || 
      (window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'https://find-the-ceo-backend.onrender.com');
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getScreenResolution(): string {
    return `${window.screen.width}x${window.screen.height}`;
  }

  private getTimeSpent(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  private async sendEvent(eventData: Omit<GameEventData, 'sessionId'>): Promise<void> {
    try {
      const fullEventData: GameEventData = {
        sessionId: this.sessionId,
        ...eventData
      };

      console.log('📊 Sending analytics event:', eventData.eventType, 'to:', `${this.apiBaseUrl}/api/analytics/track`);

      const response = await fetch(`${this.apiBaseUrl}/api/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullEventData)
      });

      if (!response.ok) {
        console.warn('⚠️ Analytics event not sent:', response.statusText);
      } else {
        console.log('✅ Event tracked successfully:', eventData.eventType);
      }
    } catch (error) {
      console.warn('⚠️ Failed to send analytics event:', error);
    }
  }

  // Track game start
  async trackGameStart(level: number): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'game_start',
      gameLevel: level,
      score: 0,
      stats: {
        correctClicks: 0,
        wrongClicks: 0,
        memesCaught: 0
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level), // 5s -> 4s -> 3s -> 2s -> 1s
        qualified: false
      }
    });
  }

  // Track correct click
  async trackCorrectClick(level: number, score: number, stats: { correct: number; memes: number }): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'correct_click',
      gameLevel: level,
      score,
      stats: {
        correctClicks: stats.correct,
        wrongClicks: 0, // We don't track wrong clicks in this event
        memesCaught: stats.memes
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level),
        qualified: false
      }
    });
  }

  // Track wrong click
  async trackWrongClick(level: number, score: number, stats: { correct: number; memes: number }): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'wrong_click',
      gameLevel: level,
      score,
      stats: {
        correctClicks: stats.correct,
        wrongClicks: 1,
        memesCaught: stats.memes
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level),
        qualified: false
      }
    });
  }

  // Track game end
  async trackGameEnd(level: number, score: number, stats: { correct: number; memes: number }, qualified: boolean): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'game_end',
      gameLevel: level,
      score,
      stats: {
        correctClicks: stats.correct,
        wrongClicks: 0, // We don't track total wrong clicks in this event
        memesCaught: stats.memes
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level),
        qualified
      }
    });
  }

  // Track level completion
  async trackLevelComplete(level: number, score: number, stats: { correct: number; memes: number }): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'level_complete',
      gameLevel: level,
      score,
      stats: {
        correctClicks: stats.correct,
        wrongClicks: 0,
        memesCaught: stats.memes
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level),
        qualified: true
      }
    });
  }

  // Track level failure
  async trackLevelFail(level: number, score: number, stats: { correct: number; memes: number }): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'level_fail',
      gameLevel: level,
      score,
      stats: {
        correctClicks: stats.correct,
        wrongClicks: 0,
        memesCaught: stats.memes
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level),
        qualified: false
      }
    });
  }

  // Track share score
  async trackShareScore(level: number, score: number, platform: string): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'share_score',
      gameLevel: level,
      score,
      stats: {
        correctClicks: 0,
        wrongClicks: 0,
        memesCaught: 0
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level),
        qualified: false
      }
    });
  }

  // Track session abandon
  async trackSessionAbandon(level: number, score: number, stats: { correct: number; memes: number }): Promise<void> {
    const screenDimensions = getScreenDimensions();
    const deviceType = getDeviceType();
    
    await this.sendEvent({
      eventType: 'session_abandon',
      gameLevel: level,
      score,
      stats: {
        correctClicks: stats.correct,
        wrongClicks: 0,
        memesCaught: stats.memes
      },
      metadata: {
        deviceType,
        browser: this.getBrowserInfo(),
        screenResolution: this.getScreenResolution(),
        timeSpent: this.getTimeSpent(),
        ceoInterval: Math.max(1, 6 - level),
        qualified: false
      }
    });
  }

  // Get session ID for debugging
  getSessionId(): string {
    return this.sessionId;
  }
}

// Export singleton instance
export const analytics = new AnalyticsService(); 