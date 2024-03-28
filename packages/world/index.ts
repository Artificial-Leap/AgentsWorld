import { identification } from "../engine/packets";
import { initServer, send } from "../engine/server";
import type WebSocket from "ws";
import { Add, GetAgentSocketById, GetClientSocketById, Remove } from "./world";

const OnClientConnected = (ws: WebSocket) => {
  console.log("New client connected!");
};

const OnMessage = (ws: WebSocket, message: any) => {
  const id = message.id;

  if (id === identification) {
    const { is_agent, data } = message;
    Add(is_agent, data, ws);
  } else {
    const { target_type, target_id, data } = message;
    let target_ws: WebSocket | null = null;
    if (target_type === "agent") {
      target_ws = GetAgentSocketById(target_id);
    } else {
      target_ws = GetClientSocketById(target_id);
    }

    if (!target_ws) {
      return;
    }

    const new_data = {
      id,
      data,
    };
    send(target_ws, new_data);
  }
};

const OnClientDisconnected = (ws: WebSocket) => {
  Remove(ws);
};

initServer(OnClientConnected, OnMessage, OnClientDisconnected);
