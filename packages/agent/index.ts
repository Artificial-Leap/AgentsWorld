import yargs from "yargs";
import agents, { TAgent } from "./data/agents";
import { initClient, send } from "../engine/client";
import { identification, receive_action } from "../engine/packets";
import HandleAction from "./action_handler";

//npm run agent -- --id=1
export let agent: TAgent | null = null;

const OnConnected = () => {
  console.log("Connected to server!");
  const identification_packet = {
    id: identification,
    is_agent: true,
    data: {
      id: agent?.id,
      name: agent?.name,
    },
  };
  send(identification_packet);
};

const OnMessage = (message: any) => {
  const id = message.id;

  if (id === receive_action) {
    const { data } = message;
    HandleAction(data);
  }
};

const OnDisconnected = () => {};

const init = async () => {
  const argv = await yargs(process.argv.slice(2))
    .option("id", {
      alias: "i",
      description: "The ID of the agent",
      demandOption: true,
      type: "string",
    })
    .help()
    .alias("help", "h").argv;

  const agentId = argv.id;
  for (let i = 0; i < agents.length; i++) {
    if (agents[i].id === agentId) {
      agent = agents[i];
    }
  }
  initClient(OnConnected, OnMessage, OnDisconnected);
};

init();
