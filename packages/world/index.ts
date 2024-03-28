import { identification } from "../engine/packets";
import { initServer } from "../engine/server";
import type WebSocket from "ws";
import { Add, Remove } from "./world";

const OnClientConnected = (ws: WebSocket) => {
  console.log("New client connected!");
};

const OnMessage = (ws: WebSocket, message: any) => {
  const id = message.id;

  if (id === identification) {
    const { is_agent, data } = message;
    console.log("Agent:", is_agent, "data:", data);
    Add(is_agent, data, ws);
  }
};

const OnClientDisconnected = (ws: WebSocket) => {
  Remove(ws);
};

initServer(OnClientConnected, OnMessage, OnClientDisconnected);
