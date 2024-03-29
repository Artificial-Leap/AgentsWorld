const agents: TAgent[] = [
  {
    id: "1",
    name: "Agent 1",
    personality: "Happy",
    usual_starting_phrases: ["Hey there!", "What's up?"],
  },
  {
    id: "2",
    name: "Agent 2",
    personality: "Curious",
    usual_starting_phrases: ["Hey there!", "What's up?"],
  },
];

export type TAgent = {
  id: string;
  name: string;
  personality: string;
  usual_starting_phrases: string[];
};

export default agents;
