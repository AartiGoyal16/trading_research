# AlgoChowk Research Platform: AI-Powered Trading UI

A streamlined, Service-Oriented Architecture (SOA) prototype that translates natural language market hypotheses into structured quantitative backtests.

## 🎯 Product Vision
This application embraces the **"Build less. Think more."** philosophy. Instead of an open-ended conversational chatbot, this platform provides a structured, deterministic research workflow:
1. **Natural Language Processing:** Users input trading ideas in plain English (or select from suggested prompts).
2. **Deterministic Parameter Extraction:** The LLM extracts strict quantitative parameters (Instrument, Action, Trigger Drop %, Holding Period).
3. **Historical Simulation:** The system runs a programmatic backtest against historical price series and presents objective KPIs.

## 🏗️ Architecture Strategy
To maintain clean separation of concerns without introducing multi-server infrastructure overhead, this project uses an isolated **Service-Oriented Architecture** inside Next.js:

*   **UI Components (`/src/components`):** Presentation layer handling input chips, specification cards, and KPI dashboards.
*   **API Controllers (`/src/app/api`):** Thin Next.js App Router endpoints routing HTTP traffic to underlying services.
*   **Service Layer (`/src/services`):** 
    *   `llm.service.ts`: Isolated AI logic using Groq's `openai/gpt-oss-20b` endpoint with JSON schema enforcement.
    *   `quant.service.ts`: Pure mathematical simulation engine. Completely decoupled from HTTP and LLM logic.

## 💡 Key Engineering Decisions
*   **Graceful Degradation & Fallback UX:** If a user query lacks specific values (e.g., an unstated drop percentage or exit timeframe), the LLM sets those parameters to `null`. The UI detects this and dynamically surfaces explicit dropdowns so the user can complete the specification without error.
*   **Deterministic Simulation Engine:** Backtest calculations are completely decoupled from external network latency. All returns, friction adjustments, and benchmark comparisons are executed synchronously in the service layer.
*   **Prompt Engineering for Strict JSON:** Leveraged zero-shot JSON-mode prompting on Groq, ensuring the extraction step acts as a typed schema validation layer before reaching the quant engine.

## 💻 Tech Stack
| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.5 (App Router) | React framework and API routing |
| **Language** | TypeScript | Strict type safety and interface definitions |
| **Styling** | Tailwind CSS | Dark-themed, responsive dashboard interface |
| **AI Integration** | Groq API (OpenAI SDK) | Fast parameter extraction (`openai/gpt-oss-20b`) |
| **Icons** | Lucide React | Clean UI icons |

## 🚀 Live Demo
**https://tradingresearch.vercel.app/**

## 🛠️ Local Development Setup

**1. Clone the repository:**

    git clone https://github.com/YOUR-USERNAME/trading_research.git
    cd trading_research

**2. Install dependencies:**

    npm install

**3. Configure Environment Variables:**
Create a `.env.local` file in the root directory:

    GROQ_API_KEY=gsk_your_api_key_here

**4. Run the development server:**

    npm run dev

Open http://localhost:3000 in your browser.