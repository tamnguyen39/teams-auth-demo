# teams-auth bot
Steps for reproduce bug 
1. create file .env from env.example and config bot
2. Start bot:
```
node ./index.js
```
3. Text to bot
4. Use `POST` request to `http://localhost:3978/api/12956/proactive`
5. Click to login button and sign in
6. You can see OAuthPrompt shows twice
