export type WebSocketMessageType =
  | 'subscribe'
  | 'subscribed'
  | 'unsubscribe'
  | 'unsubscribed'
  | 'channel_data'
  | 'ping'
  | 'pong'
  | 'error';

export type WebSocketMessage = {
  type: WebSocketMessageType;
  timestamp?: number;
  channel?: string;
  data?: unknown;
  message?: string;
  id?: string;
};

export type SubscribeMessage = {
  type: 'subscribe'; channel: string; id?: string;
};

export type PongMessage = {
  type: 'pong'; timestamp: number;
};

export type ChannelDataMessage<T = unknown> = {
  type: 'channel_data'; timestamp: number; channel: string; data: T;
};