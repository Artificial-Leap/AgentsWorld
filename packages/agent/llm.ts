import { HfInference } from "@huggingface/inference";
import { TMessage } from "./types";
import { agent } from ".";

let hf: HfInference | null = null;

export const initLLM = (model: string) => {
  if ("mistralai/Mistral-7B-Instruct-v0.1") {
    const hfKey = process.env.HF_API_KEY;
    hf = new HfInference(hfKey);
  }
};

const DoLLMCall = async (messages: TMessage[], model: string) => {
  let text = "";
  if (model === "mistralai/Mistral-7B-Instruct-v0.1" && hf) {
    let prompt = "";
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].Content) {
        continue;
      }

      if (i === messages.length - 1) {
        prompt += `[INST]${messages[i].Sender}: ${messages[i].Content}[/INST]`;
      } else {
        prompt += `${messages[i].Sender}: ${messages[i].Content}`;
      }
    }

    const hfResponse = await hf.textGeneration({
      model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 10000,
        return_full_text: false,
        repetition_penalty: 1.2,
      },
    });
    text = hfResponse.generated_text;
  }

  return text;
};

export const initLLMConversation = (model: string): TMessage => {
  const prompt: TMessage = {
    Sender: "user",
    Content: "",
  };
  let startingPhrases = "";
  if (agent) {
    for (let i = 0; i < agent.usual_starting_phrases.length; i++) {
      startingPhrases += `${agent.usual_starting_phrases[i]}, `;
    }
  }

  if (model === "mistralai/Mistral-7B-Instruct-v0.1") {
    prompt.Content = "<INFORMATION>\n";
    prompt.Content += `Act as an agent and roleplay with the user, your name is: ${agent?.name} and your personality: ${agent?.personality}\n`;
    prompt.Content += `Your usual starting phrases are: ${startingPhrases}\n`;
    prompt.Content += "</INFORMATION>";
  }
  return prompt;
};

export const DEFAULT_LLM = "mistralai/Mistral-7B-Instruct-v0.1";
export default DoLLMCall;
