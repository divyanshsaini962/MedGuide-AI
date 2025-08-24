medical-bot-frontend
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── src
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── routes.jsx
│   ├── utils
│   │   └── storage.js
│   ├── services
│   │   └── api.js
│   ├── context
│   │   ├── AuthContext.jsx
│   │   └── ChatContext.jsx
│   ├── components
│   │   ├── Sidebar.jsx
│   │   ├── ChatInput.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── Topbar.jsx
│   │   └── Loading.jsx
│   └── pages
│       ├── Chat.jsx
│       ├── Login.jsx
│       ├── Signup.jsx
│       └── AdminUpload.jsx
└── README.md
````markdown
# Frontend setup

Create a `.env` in `medical-bot-frontend/` with the following values (do NOT commit secrets):

```
VITE_API_BASE=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

Google Console notes:
- Create an OAuth 2.0 Client ID (Web application).
- Add `http://localhost:5173` to Authorized JavaScript origins for development.
- No client secret is required for the Identity Services ID token flow used here.

Restart the dev server after updating `.env`:

```bash
cd medical-bot-frontend
npm run dev
```
