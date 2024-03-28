import { agent } from "..";
import { send } from "../../engine/client";
import { receive_action } from "../../engine/packets";
import DoLLMCall, { DEFAULT_LLM } from "../llm";

interface Message {
  [sender_id: string]: string[];
}

const messages: { [sender_id: string]: Message } = {};

export const HandleMessage = (
  client_type: string,
  sender_id: string,
  message: string
) => {
  if (!messages[sender_id]) {
    messages[sender_id] = {};
  }
  if (!messages[sender_id][sender_id]) {
    messages[sender_id][sender_id] = [];
  }

  messages[sender_id][sender_id].push(message);
  const response = DoLLMCall(messages[sender_id][sender_id], DEFAULT_LLM);

  const new_packet = {
    id: receive_action,
    target_id: sender_id,
    target_type: client_type,
    data: {
      content: response,
      sender_id: agent?.id,
      sender_name: agent?.name,
      action_type: "message",
      sender_type: "agent",
    },
  };
  send(new_packet);
};