This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Install Electron for the desktop app

npm install electron @electron/remote concurrently cross-env

# Install Prisma & SQLite

npm install prisma @prisma/client sqlite3
npx prisma init --datasource-provider sqlite

Define the **navigation and flow of the mock exam pages** step by step. Since this is an MVP, we should keep it simple and user-friendly.

---

## **🛠️ Exam Flow & Navigation**

### **1️⃣ Exam Home Page (/mock-test)**

📌 **Purpose:** Let students select a category and start a test.  
📌 **Main Features:**

- Dropdown to select **category** (Engine, Electrical, Traffic Rules, etc.).
- "Start Test" button to begin the exam.
- Option to **view past results**.

🔗 **Navigation:**

- Clicking **Start Test → Moves to /mock-test/start**
- Clicking **View Results → Moves to /mock-test/results**

---

### **2️⃣ Start Test Page (/mock-test/start)**

📌 **Purpose:** Display exam instructions and let students begin.  
📌 **Main Features:**

- Show **test title, category, and number of questions**.
- Display **exam rules** (e.g., time limit, no skipping, etc.).
- "Begin Exam" button.

🔗 **Navigation:**

- Clicking **Begin Exam → Moves to /mock-test/exam**

---

### **3️⃣ Exam Page (/mock-test/exam)**

📌 **Purpose:** Display questions and capture student answers.  
📌 **Main Features:**

- Show **one question at a time**.
- Display **multiple-choice options**.
- Allow **"Next"** and **"Previous"** navigation.
- Show a **progress bar** (e.g., "Question 3 of 10").
- **Timer** (if time limit is enabled).

🔗 **Navigation:**

- Clicking **Next → Moves to the next question**.
- Clicking **Previous → Moves to the previous question**.
- Clicking **Submit → Moves to /mock-test/submit**.

---

### **4️⃣ Submission Page (/mock-test/submit)**

📌 **Purpose:** Confirm exam submission.  
📌 **Main Features:**

- Show **summary of answered/unanswered questions**.
- "Submit Test" button for final submission.

🔗 **Navigation:**

- Clicking **Submit Test → Moves to /mock-test/result**

---

### **5️⃣ Results Page (/mock-test/result)**

📌 **Purpose:** Show exam score and correct answers.  
📌 **Main Features:**

- Display **score (e.g., 8/10)**.
- Show **correct answers** for review.
- "Retake Test" button to restart.

🔗 **Navigation:**

- Clicking **Retake Test → Moves to /mock-test**
- Clicking **Exit → Moves to homepage**

---

## **📌 Additional Features (Future Enhancements)**

✅ **Review Mode** – Let students go back and see their mistakes.  
✅ **Timed Exams** – Automatically submit when the timer ends.

---

### **🔗 Final Navigation Map**

```
/mock-test → Select Category → /mock-test/start → Read Instructions
/mock-test/start → Click Begin → /mock-test/exam → Answer Questions
/mock-test/exam → Click Submit → /mock-test/submit → Confirm
/mock-test/submit → Click Submit Test → /mock-test/result
/mock-test/result → View Score → Retake or Exit
```

    // "dev": "concurrently \"next dev --turbopack\" \"cross-env NODE_ENV=development electron .\""
