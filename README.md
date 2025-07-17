# Node.js + TypeScript Backend Boilerplate

This project is a backend boilerplate using **TypeScript**, **Express**, **MongoDB (Mongoose)**, **Zod**, **JWT**, **Google OAuth**, and **Passport.js**. It's ideal for starting a secure and scalable server-side application.

---

## 💠 Tech Stack

* **Node.js** / **Express**
* **TypeScript**
* **Mongoose** (MongoDB ODM)
* **Zod** (Schema Validation)
* **JWT** (Authentication)
* **Passport.js** (Local and Google OAuth)
* **Cookie Parser**
* **ESLint** (Linting)
* **dotenv** (Environment Config)
* **bcryptjs** (Password Hashing)

---

## 📦 Installation

```bash
# Initialize project and install TypeScript
npm init -y
npm i -D typescript
tsc --init

# Express + Core Dependencies
npm i express mongoose zod jsonwebtoken cors dotenv

# Dev Dependencies
npm i -D ts-node-dev @types/express @types/cors @types/dotenv @types/jsonwebtoken

# HTTP status code helpers
npm i http-status-codes

# For password hashing
npm i bcryptjs
npm i -D @types/bcryptjs

# JWT types (again for safety)
npm i jsonwebtoken
npm i -D @types/jsonwebtoken

# Cookie parser
npm i cookie-parser
npm i -D @types/cookie-parser
```

---

## 🔐 Passport Setup

### Local Strategy

```bash
npm install passport-local
npm i -D @types/passport-local
```

### Google OAuth 2.0

```bash
npm install passport-google-oauth20
npm i -D @types/passport-google-oauth20
```

### Session Management

```bash
npm i express-session
npm i -D @types/express-session
```

### Google OAuth Credentials
create project on cloud google console
```
Client ID:

Client Secret:
```

Make sure to store these securely in a `.env` file.

---

## ⚙️ ESLint Setup

### Step 1: Install ESLint for TypeScript

```bash
npm install --save-dev eslint @eslint/js typescript typescript-eslint
```

### Step 2: Create `eslint.config.mjs`

```js
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
```

### Step 3: Run ESLint

```bash
npx eslint .
```

---

## 💡 Scripts (in `package.json`)

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "lint": "eslint ."
}
```

---

## 📁 Project Structure (Suggested)

```
src/
│
├── app/
│   ├── modules/
│   ├── middlewares/
│   ├── utils/
│   └── config/
│
├── types/
├── index.ts
└── ...
```

---

## 📊 Run Project

```bash
# Development
npm run dev

# Build and Start
npm run build
npm start
```

---

## 📜 License

This project is open-sourced under the [MIT License](LICENSE).

---

## ✍️ Author

* Developed by \[Your Name Here]
