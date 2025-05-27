🖥 Frontend (React + TypeScript + Vite) - README✅ Requirements:Node.js v18+
NPM or Yarn
📁 Project Structure:admin-dashboard-frontend/
├── src/
│   ├── api/axiosInstance.ts
│   ├── components/
│   │   ├── LoginPage.tsx
│   │   ├── Dashboard.tsx
│   │   └── Profile.tsx
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts🔐 Authentication Logic:Stores JWT in localStorage as token
Axios sends it with every request via Authorization: Bearer ...
Redirects to /login if unauthorized
▶️ Running locally:cd admin-dashboard-frontend
npm install
npm run devFrontend will start on http://localhost:5173
🔁 Routes:/login → Login page
/dashboard → Admin dashboard (protected)
/profile → User profile (protected)
🚧 Common TroubleshootingMake sure the backend is running on http://localhost:5051
Verify token exists in localStorage
Ensure CORS and JWT middleware are active in Program.cs
Use browser DevTools > Network tab to check Authorization headers
