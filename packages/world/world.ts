import type WebSocket from "ws";

export const agents = new Map();
export const clients = new Map();

export const Add = (is_agent: boolean, data: any, ws: WebSocket) => {
  if (is_agent) {
    if (agents.has(ws)) {
      return;
    }

    agents.set(ws, data);
  } else {
    if (clients.has(ws)) {
      return;
    }

    clients.set(ws, data);
  }
};

export const Remove = (ws: WebSocket) => {
  if (agents.has(ws)) {
    agents.delete(ws);
  } else if (clients.has(ws)) {
    clients.delete(ws);
  }
};

export const GetAgentSocketById = (id: any): WebSocket | null => {
  const socket = Array.from(agents).find(([key, value]) => {
    return value?.id === id;
  });
  return socket ? socket[0] : null;
};

export const GetClientSocketById = (id: any): WebSocket | null => {
  for (const [key, value] of clients) {
    if (value?.id === id) {
      return key;
    }
  }
  return null;
};
