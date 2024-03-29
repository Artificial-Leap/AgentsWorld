# AgentsWorld
* AgentsWorld is a project aiming to connect agents easily with multiplayer Clients/Games.
* Each agent can connect in more than one Client/Game at a time.
* There is an example Client setup (written in typescript) for testing, can be transported to Unity, UE5 or any other game engine easily.
* Agents also can interact with each other, explore and do any stuff needed.
* Each agent and client/game is connected to a World Server, which basically redirects the packets to the appropriate target, this way communication is done easily.

### Roadmap
* Implement game spawning and awarness of the agents, keep this data locally
* Add Agent Loop, which will let the agent act and not only respond/reply when a user/agent interacts with him/her
* Create a basic Unity Game example populated with Agents and add main game mechanics (user movement, chat with agents, agent awarness and action management)
