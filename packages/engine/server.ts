import WebSocket from "ws";

let wss: WebSocket.Server | null = null;
export const initServer = (
  port: number,
  OnClientConnected: (ws: WebSocket) => void,
  OnMessaage: (ws: WebSocket, message: any) => void,
  OnClientDisconnected: (ws: WebSocket) => void
) => {
  wss = new WebSocket.Server({ port });
  console.log(`Server started on port: ${port}`);

  wss.on("connection", (ws: WebSocket) => {
    OnClientConnected(ws);

    ws.on("message", (message: string) => {
      const json = JSON.parse(message);
      OnMessaage(ws, json);
    });

    ws.on("close", () => {
      OnClientDisconnected(ws);
    });
  });
};

export const send = (ws: WebSocket, data: any) => {
  if (!ws || !data) {
    return;
  }

  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  ws.send(data);
};

export const broadcast = (data: any) => {
  if (!wss || !data) {
    return;
  }

  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  wss.clients.forEach((client) => {
    client.send(data);
  });
};
