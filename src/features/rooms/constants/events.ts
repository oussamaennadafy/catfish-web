/**
 * Rooms feature socket event names
 */
export const RoomEvents = {
  // Client events (sent from client to server)
  client: {
    JOIN_ROOM: 'join-room',
    LEAVE_ROOM: 'leave-room',
    TOGGLE_CAMERA: 'toggle-camera',
    TOGGLE_MIC: 'toggle-mic',
    STREAM_STARTED: 'stream-started',
  },
  
  // Server events (sent from server to client)
  server: {
    USER_JOINED: 'user-joined',
    USER_DISCONNECTED: 'user-disconnected',
    CAMERA_TOGGLED: 'camera-toggled',
    MIC_TOGGLED: 'mic-toggled',
    READY_TO_JOIN: "ready-to-join",
    STREAM_STARTED: 'stream-started',
  }
} as const;

// You can also create a type for these events
export type RoomEventNames = typeof RoomEvents[keyof typeof RoomEvents];