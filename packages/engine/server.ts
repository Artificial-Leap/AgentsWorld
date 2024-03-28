import WebSocket from "ws";

//Register clients when connected, request them type
//So we know each client if is a client or agent
//The type message, will also include name/id
//like AgentId or Game Id
let wss: WebSocket.Server | null = null;
const port = 7777;
export const initServer = (
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