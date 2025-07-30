import mongoose, { Schema, Document } from 'mongoose';

export interface IGameEvent extends Document {
  sessionId: string;
  userId?: string; // Optional for anonymous users
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
    timeSpent: number; // in seconds
    ceoInterval: number; // difficulty level
    qualified: boolean;
  };
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

const GameEventSchema = new Schema<IGameEvent>({
  sessionId: { type: String, required: true, index: true },
  userId: { type: String, required: false, index: true },
  eventType: { 
    type: String, 
    required: true, 
    enum: ['game_start', 'game_end', 'correct_click', 'wrong_click', 'level_complete', 'level_fail', 'share_score', 'session_abandon'],
    index: true 
  },
  gameLevel: { type: Number, required: true, index: true },
  score: { type: Number, required: true },
  stats: {
    correctClicks: { type: Number, required: true },
    wrongClicks: { type: Number, required: true },
    memesCaught: { type: Number, required: true }
  },
  metadata: {
    deviceType: { 
      type: String, 
      required: true, 
      enum: ['mobile', 'tablet', 'desktop'],
      index: true 
    },
    browser: { type: String, required: true },
    screenResolution: { type: String, required: true },
    timeSpent: { type: Number, required: true },
    ceoInterval: { type: Number, required: true },
    qualified: { type: Boolean, required: true }
  },
  timestamp: { type: Date, default: Date.now, index: true },
  ipAddress: { type: String, required: false },
  userAgent: { type: String, required: false }
});

// Indexes for better query performance
GameEventSchema.index({ timestamp: -1 });
GameEventSchema.index({ eventType: 1, timestamp: -1 });
GameEventSchema.index({ gameLevel: 1, timestamp: -1 });
GameEventSchema.index({ 'metadata.deviceType': 1, timestamp: -1 });

export const GameEvent = mongoose.model<IGameEvent>('GameEvent', GameEventSchema); 