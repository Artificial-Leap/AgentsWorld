const agents: TAgent[] = [
  {
    id: "1",
    name: "Agent 1",
    personality: "Happy",
  },
  {
    id: "2",
    name: "Agent 2",
    personality: "Curious",
  },
];

export type TAgent = {
  id: string;
  name: string;
  personality: string;
};

export default agents;
