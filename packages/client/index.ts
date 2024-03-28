import { initClient, send } from "../engine/client";
import { identification } from "../engine/packets";

const OnConnected = () => {
  console.log("Connected to server!");
  const identification_packet = {
    id: identification,
    is_agent: false,
    data: {
      id: "game",
    },
  };
  send(identification_packet);
};

const OnMessage = (message: any) => {
  const id = message.id;
};

const OnDisconnected = () => {};

initClient(OnConnected, OnMessage, OnDisconnected);
