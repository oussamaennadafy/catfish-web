/**
 * Rooms feature socket event names
 */
export const RoomEvents = {
  // Client events (sent from client to server)
  client: {
    JOIN_ROOM: 'join-room',
    LEAVE_ROOM: 'leave-room',
    TOGGLE_CAMERA: 'toggle-camera',
  },
  
  // Server events (sent from server to client)
  server: {
    USER_JOINED: 'user-joined',
    USER_DISCONNECTED: 'user-disconnected',
    TOGGLE_CAMERA_UPDATE: 'toggle-camera',
    ROOM_FULL: 'room-full',
    MATCH_FOUND: 'match-found',
    READY_TO_JOIN: "ready-to-join"
  }
} as const;

// You can also create a type for these events
export type RoomEventNames = typeof RoomEvents[keyof typeof RoomEvents];