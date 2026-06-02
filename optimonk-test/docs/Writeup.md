# Final Write-up
I spent approximately 5 hours implementing the assignment itself (from around 17:00 to 22:00), excluding the README and write-up.

Before starting development, I spent additional time getting familiar with Vue. My professional and personal frontend experience has primarily been with React and TypeScript, so part of this assignment was also a learning exercise.
During the planning phase, I wrote down my problem understanding, assumptions and design decisions in `docs/Kezdeti_Gondolatok.md` before implementing anything. It is intentionally written in Hungarian to preserve my initial reasoning in its most direct form at early stage.

## V1 scope

I built a small Vue + Tailwind app where users can:

- Browse campaigns in a sidebar
- Select one campaign
- See campaign-level conversion and visitor data
- Review each funnel step separately
- See drop-off rate and lost visitors per step
- Quickly identify the worst drop-off step
- View the app on mobile devices

## Solution

The app loads static campaign data from JSON to the frontend. `src/data/campaigns.ts`.
The models / types are stored in `src/types/types.ts`. I built this based on the JSON structure.
The funnel metrics are calculated in `src/utils/metrics.ts`, including:

- Overall campaign conversion rate
- Conversion rate at each step
- Drop-off rate at each step
- Worst-performing step

The UI is split into reusable components:

- `CampaignSidebar` for campaign selection
- `CampaignOverview` for compact campaign-level context
- `CampaignStepSummary` for quick step comparison
- `FunnelStepCard` for detailed step performance
- `ProgressBar` for visualizing drop-off loss

The worst step is highlighted in red and can be reached from the overview too. The layout is responsive and optimized for mobile as well as desktop.
The styles are stored in `.css` files next to the relevant components. If the layout were more complex, I would place them inside their own folder structure.

## AI usage

I used AI throughout the assignment as a development assistant rather than as a solution generator.
- During planning, I used it to challenge my initial ideas and help me think through what a realistic v1 should include.
- During implementation, I used AI to speed up repetitive work such as component scaffolding, refining Tailwind styling, and detecting bugs. At the end, I also used it to review the UI from the perspective of a non-technical user and suggest improvements.
- For minor bugs I used ChatGPT so I can save tokens.
- For repetitive work and tailwind + css usage I used Codex.

The architecture, layout and component structure, calculations, the business logic's code and product decisions were my own.
## V2 improvements

- I would use a UI library
- I'd place a Search Bar at the top of the Sidebar and maybe device filter options.
- FunnelStepCards could be collapsable.
- A small comparison view between campaigns
- I'd add Unit tests for business logic

## Further improvements
- AI integration, so AI could write recommendations for weak steps via system prompts.
- I would add an API so we could migrate calculation business logic there and fetch via REST

## Final thoughts

I enjoyed working on this assignment. The topic was engaging and it was interesting to break down a real-world product problem into a small, working application.
Thank you for your time reviewing it.