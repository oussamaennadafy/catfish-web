/**
 * Rooms feature socket event names
 */
export const ChatEvents = {
  // Client events (sent from client to server)
  client: {
    SEND_MESSAGE: 'send-message',
  },
  
  // Server events (sent from server to client)
  server: {
    RECEIVE_MESSAGE: 'receive-message',
  }
} as const;

// You can also create a type for these events
export type RoomEventNames = typeof ChatEvents[keyof typeof ChatEvents];