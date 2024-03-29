import HandleAudio from "./action_handlers.ts/heard_audio";
import { HandleMessage } from "./action_handlers.ts/message";
import HandlePlayer from "./action_handlers.ts/saw_player";

const HandleAction = (data: any) => {
  const { action_type } = data;
  if (action_type === "message") {
    HandleMessage(data.client_type, data.sender_id, data.message);
  } else if (action_type === "saw_player") {
    HandlePlayer(
      data.client_id,
      data.player_id,
      data.player_name,
      data.player_location,
      data.player_action
    );
  } else if (action_type === "head_audio") {
    HandleAudio(data.client_id, data.audio, data.audio_location);
  }
};

export default HandleAction;
