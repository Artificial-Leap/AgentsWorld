import { initClient, send } from "../engine/client";
import { identification, receive_action } from "../engine/packets";
import readLine from "./reader";

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

  if (id === receive_action) {
    const { data } = message;
    const { content, sender_id, sender_name, action_type, sender_type } = data;
    console.log(`${sender_name}: ${content}`);
  }
};

const OnDisconnected = () => {};

initClient(OnConnected, OnMessage, OnDisconnected);
readLine();
