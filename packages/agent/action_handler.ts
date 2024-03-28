import { HandleMessage } from "./action_handlers.ts/message";

const HandleAction = (data: any) => {
  const { action_type } = data;
  if (action_type === "message") {
    HandleMessage(data.client_type, data.sender_id, data.message);
  }
};

export default HandleAction;
