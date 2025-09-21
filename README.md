# 🌍 Carbon Credit Dashboard – Offset Frontend Assignment

This project is a **Carbon Credit Dashboard** built with **Next.js 15 (Turbopack)** as part of the frontend assignment for **Offset**.  

The dashboard allows users to **search, filter, view details, and download retirement certificates** for carbon credits, ensuring transparency and trust in carbon offsetting.

---

## 📖 Assignment Description

As we know, the world is polluted because people and companies emit CO2 on a daily basis. To regulate this, **carbon credits** were created.  

- **1 carbon credit = 1 ton of CO2 offset or prevented.**  
- Companies buy carbon credits to offset their emissions.  
- Offset ensures every carbon credit has a clear life cycle: **created → sold → retired**.  

### Task
Build a **dashboard** where users can:

- Display credits from a JSON file (fields: `unic_id`, `project_name`, `vintage`, `status`).
- Show **status badges**:
  - 🟢 **Active** = Green badge  
  - ⚪ **Retired** = Gray badge  
- Add a **search/filter bar** (by project name or vintage).
- Provide a button: **“Download Retirement Certificate”**.  
  - The certificate should include **UNIC ID, project name, vintage, status, and timestamp**.  
  - Users should be able to download as **HTML or PDF**.  

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)  
- **UI Components**: [ShadCN](https://ui.shadcn.com/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **Icons**: [Lucide React](https://lucide.dev/)  
- **PDF Export**: [jsPDF](https://github.com/parallax/jsPDF)  

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/anasnadkar45/frontend-assignment-sept-20.git
   cd frontend-assignment-sept-20
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the project locally:
   ```bash
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## 📝 Reflection Questions & Answers

### ❓ How did you decide what to show on the main page vs details?

First, I collected all the information required for the dashboard. Then I visited **Dribbble** for design inspiration and finalized one design from there. I decided what and how much to display on the page based on this design.  

Since there wasn't much data in the JSON, I displayed it directly on the UI in two formats: **cards** and a **list table**.  
This gives users two options to view the data.  

When users click the **download button**, I show a modal with download options like **HTML** and **PDF**.

---

### 🎨 What design choices did you make to keep it clean?

To keep the design clean, I followed several principles:

- **Consistent Color Scheme**: Maintained visual harmony throughout the dashboard.  
- **Clear Sections & Spacing**: Organized data with proper spacing to prevent clutter.  
- **Minimal Typography**: Limited to 2-3 font sizes/weights for hierarchy.  
- **Cards & Lists**: Used subtle shadows and borders to separate components without overwhelming the UI.  
- **White Space**: Strategically applied to let the content breathe.  
- **Grid Alignment**: Ensured readability and consistency across layouts.  

---

### ⚡ If the system had 10,000 credits, how would you keep the dashboard fast?

To ensure performance and scalability:

1. **Avoid fetching all 10,000 credits at once.**  
   - Implement **server-side pagination** (20–50 records per request).  
   - Reduces load time and memory usage.  

2. **Smooth Loading Experience.**  
   - Use **React Suspense** with fallback skeleton loaders.  
   - Provide visual feedback while data is loading.  

3. **Optimized Search.**  
   - Apply **debouncing** (300–500ms) to reduce unnecessary API calls.  
   - Use **throttling** for continuous events like scrolling.  

4. **Virtual Scrolling.**  
   - Render only visible list items at any given time.  
   - Enhances performance when handling thousands of records.  

5. **Caching Strategies.**  
   - Store previously fetched data to avoid redundant network requests.  
   - Improves navigation speed and reduces server load.  

---

## 🌐 Deployment

The project is hosted at:  
👉 [Live Demo](https://offset-frontend-assignment-anas-nad.vercel.app/)

---


✅ This project ensures the dashboard remains **clean, user-friendly, and performant**, even when handling large datasets.
