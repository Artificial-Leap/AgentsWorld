import WebSocket from "ws";

const port = 7777;
let ws: WebSocket | null = null;

export const initClient = (
  OnConnected: () => void,
  OnMessage: (message: any) => void,
  OnDisconnected: () => void
) => {
  ws = new WebSocket(`ws://localhost:${port}`);
  ws.on("open", OnConnected);
  ws.on("message", (message: string) => {
    const json = JSON.parse(message);
    OnMessage(json);
  });
  ws.on("close", OnDisconnected);
};

export const send = (data: any) => {
  if (!ws || !data) {
    return;
  }

  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  ws.send(data);
};
