# AI Chatbot UI Prototype

Industry-agnostic AI chatbot UI prototype with scripted flows and a lightweight Express backend.

## Requirements
- Node.js 18+
- npm 9+

## Install
```bash
npm install
npm run install:all
```

## Run (frontend + backend)
```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3001`

## Triggers (keywords)
- Quick Actions: `help`, `support`, `contact`, `start`
- CRM Continuity: `welcome back`, `history`, `profile`, `crm`
- Loyalty: `points`, `loyalty`, `membership`, `rewards`
- Guided Recommendations: `recommend`, `suggest`, `not sure`, `help choose`
- Location: `nearest`, `location`, `branch`, `near me`, `directions`
- Service Recommendations: `plan`, `pricing`, `package`, `product`, `service`
- Appointment Flow: `book`, `appointment`, `schedule`, `consultation`
- Guardrails: `recipe`, `joke`, `homework`, `homework answers`

## Notes
- Trigger routing happens in the frontend (`frontend/src/data/triggers.ts`).
- Backend endpoints provide mock data for session, locations, and availability.
- Chat state is stored client-side and persists a `sessionId` in localStorage.
