# Glass Box - Social Investment Platform Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing from Vanguard's professional investment dashboards (clean data presentation, trustworthy financial interface) and Kiva's social impact storytelling (emotional connection, impact visualization).

## User-Specified Design System

### Colors (User-Defined)
- Primary: #4C51BF (indigo) - CTAs, primary actions, navigation highlights
- Secondary: #6366F1 (lighter indigo) - hover states, secondary buttons
- Accent: #8B5CF6 (purple) - highlights, badges, special indicators
- Background: #FAFAFA (off-white) - main background
- Text: #1F2937 (dark grey) - body text, headings
- Success: #10B981 (emerald) - positive metrics, gains, achievements

### Typography
- Primary: Inter (for UI, data, metrics)
- Secondary: Poppins (for headings, impact statements)
- Hierarchy: Large headings (2.5rem-3rem Poppins), metrics (2rem-2.5rem Inter bold), body (1rem Inter), data labels (0.875rem Inter)

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Card gaps: gap-6
- Grid gaps: gap-8

### Grid Structure
- Dashboard: 12-column grid for flexible data layouts
- Marketplace: 3-column card grid (lg), 2-column (md), 1-column (mobile)
- Portfolio analytics: 2-column split (chart + summary)

## Core Components

### Navigation
Top navigation bar with logo left, main links center, user profile/notifications right. Sticky header with subtle shadow on scroll. Include secondary navigation for dashboard sections (Portfolio, Discover, Impact, Analytics).

### Dashboard Cards
Professional investment card style:
- White background, subtle border, slight shadow on hover
- Header with icon + title
- Key metric prominently displayed (large, bold)
- Supporting data in smaller text below
- Trend indicators (arrows, percentages) in success/accent colors
- Micro-charts where relevant (sparklines for trends)

### Charity Cards (Marketplace)
Kiva-inspired impact cards:
- Charity image at top (16:9 ratio)
- SDG badges row below image
- Charity name (Poppins semibold)
- Impact summary (2-3 lines)
- Rating scorecard (star/score visual)
- Investment CTA button (primary color)
- Quick stats footer (beneficiaries, impact areas)

### Data Visualization
Clean, professional charts using Chart.js or similar:
- Line charts: Portfolio performance over time
- Donut charts: Investment allocation by SDG/charity
- Bar charts: Impact metrics comparison
- Use color palette consistently across charts
- Tooltips on hover with detailed breakdowns

### WETF Investment Cards
Financial product card style:
- WETF name and code (bold)
- Current value and 24h change indicator
- Performance graph (small)
- Key metrics row (ROI, impact score, beneficiaries)
- "Invest" button (secondary color)

### Impact Stories
Blend of data + narrative:
- Hero image from charity work
- Impact headline (Poppins, large)
- Key statistics in highlighted boxes
- Narrative text with real outcomes
- Before/after or progress visualizations
- Call-to-action to invest

## Page Layouts

### Landing Page
Hero section (70vh) with compelling imagery of social impact + headline "Invest in Change. Track Real Impact." + primary CTA. Features section (3-column grid): Transparency, Impact Measurement, SDG Alignment. Platform preview showcasing dashboard. Social proof with metrics (Total Invested, Charities Funded, Lives Impacted). CTA section with signup form.

### Social Investor Dashboard
Summary cards row (4 metrics): Total Invested, Active WETFs, Impact Score, ROI. Main content: 2-column layout with portfolio chart (left) and recent investments list (right). Recommended WETFs section below. Quick action panel for new investments.

### Charity Marketplace
Filter sidebar (left, 20%): SDG categories, impact areas, ratings. Charity grid (right, 80%): 3-column responsive card grid. Search bar at top with sort options. Pagination at bottom.

### WETF Details Page
Hero section with WETF name, current metrics, invest button. Performance chart (full-width). Charity composition breakdown (cards showing included charities). Impact dashboard (metrics grid). Transparency section (documentation, reports).

### Transparency Hub
Real-time impact dashboard with large metric cards, interactive charts, impact stories carousel, downloadable reports section. Filter by time period, SDG, or region.

## Images

### Hero Images
- Landing page: Inspiring image of community impact/charitable work (diverse people, positive outcomes)
- WETF pages: Abstract visualization of interconnected impact
- Charity pages: Real photos from charity operations

### Supporting Images
- Charity cards: Authentic photos from each charity's work
- Impact stories: Before/after or progress photos
- Team/about sections: Professional headshots

All images should convey authenticity, diversity, and measurable impact. Use subtle overlays for text readability.

## Interactions

### Micro-interactions
- Card hover: subtle lift (translate-y-1), shadow increase
- Button states: scale slightly on press, smooth transitions
- Chart tooltips: fade in on hover with detailed data
- Loading states: skeleton screens for data-heavy sections
- Success states: celebratory animation on investment completion

### Animations
Minimal, purposeful only:
- Entrance animations for dashboard metrics (count-up effect)
- Smooth transitions between dashboard views
- Chart data loading animations
- Success confirmation modals with gentle fade

## Key Design Principles
1. **Trust through Transparency**: Every metric linked to source data
2. **Financial Professionalism**: Clean, data-driven interfaces like Vanguard
3. **Impact Storytelling**: Emotional connection through real stories like Kiva
4. **Clarity over Complexity**: Information hierarchy that guides investors
5. **Responsive Excellence**: Seamless experience across all devices