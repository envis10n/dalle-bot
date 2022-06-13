# dalle-bot
A discord bot for calling the [dalle-playground](https://github.com/saharmor/dalle-playground) backend API.

Using discord slash commands, it will send the prompt text to the backend and reply with the generated image.

## Setup

- Ensure you have a functional [dalle-playground](https://github.com/saharmor/dalle-playground) backend running where you have access.
- Clone this repository and initialize the project with `yarn` or `npm install`.
- Rename `.env.dist` to `.env` (the project uses dotenv for configuration) and set your bot token, client ID, and backend URL.
- Run the deployment script to add the slash commands to your bot application.  
    - *You only need to run this once.*
- Run the project with `yarn start` or `npm start`.

## Config

*\* required*

- `DISCORD_TOKEN` *string* - **Your discord bot token** *
- `DISCORD_CLIENT` *string* - **Your discord bot client ID** *
- `DALLE_BACKEND` *string* - **The URL to your dalle-playground backend**