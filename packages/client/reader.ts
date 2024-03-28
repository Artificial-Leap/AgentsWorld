import * as readline from "readline";
import { receive_action } from "../engine/packets";
import { send } from "../engine/client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to read lines recursively
export default function readLine() {
  rl.question('Enter a line (or type "exit" to quit): ', (line) => {
    if (line.trim().toLowerCase() === "exit") {
      rl.close();
    } else {
      console.log("You entered:", line);
      sendMessage(line);
      readLine();
    }
  });
}

const target_agent_id = "1";
const sendMessage = (message: string) => {
  const new_packet = {
    id: receive_action,
    target_type: "agent",
    target_id: target_agent_id,
    data: {
      message,
      sender_id: "game",
      client_type: "client",
      action_type: "message",
    },
  };
  send(new_packet);
};
