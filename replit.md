# Glass Box - Transparent Social Investment Platform

## Overview
Glass Box is a comprehensive social investment platform that connects social investors to high-impact charities through transparent, measurable investments using WETFs (Wa'ad/Waqf ETFs). The platform combines the professional aesthetic of Vanguard's investment platform with Kiva's social impact storytelling.

## Project Status
**Current Phase**: Development
**Last Updated**: 2025-01-09

## Architecture

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Charts**: Recharts
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **Data Storage**: In-memory storage (MemStorage)

### Design System
**Color Palette** (User-specified):
- Primary: #4C51BF (indigo) - CTAs, navigation
- Secondary: #6366F1 (lighter indigo) - hover states
- Accent: #8B5CF6 (purple) - highlights, badges
- Background: #FAFAFA (off-white)
- Text: #1F2937 (dark grey)
- Success: #10B981 (emerald) - positive metrics

**Typography**:
- Primary: Inter (UI, data, metrics)
- Secondary: Poppins (headings, impact statements)

## Data Models

### Core Entities
1. **Charities**: High-impact organizations with SDG alignment
   - Impact scorecard (impact, transparency, efficiency)
   - Beneficiary metrics
   - Project tracking
   - Financial transparency

2. **WETFs (Wa'ad/Waqf ETFs)**: Investment vehicles
   - Performance metrics (YTD, 1yr, 3yr returns)
   - Social ROI calculations
   - Charity allocations
   - SDG focus areas

3. **Investments**: User portfolio tracking
   - Investment amounts and shares
   - Current values and returns
   - Purchase history

4. **SDGs**: UN Sustainable Development Goals reference data

## Application Structure

### Pages
- **Home** (`/`): Hero section, platform features, stats, CTA
- **Dashboard** (`/dashboard`): Portfolio overview, performance charts, recent investments
- **Marketplace** (`/marketplace`): Browse charities and WETFs with filtering
- **Transparency Hub** (`/transparency`): Real-time impact data, SDG breakdown, impact stories
- **Charity Detail** (`/charity/:id`): Detailed charity information, scorecard, projects
- **WETF Detail** (`/wetf/:id`): WETF performance, allocations, investment options

### Key Components
- **Header**: Sticky navigation with mobile menu
- **MetricCard**: Reusable metric display with icons and trends
- **PortfolioChart**: Line chart for performance visualization
- **AllocationChart**: Pie chart for SDG/charity distribution
- **CharityCard**: Grid card for charity marketplace
- **WetfCard**: Grid card for WETF display

## Development Workflow

### Running the Project
```bash
npm run dev
```
This starts both the Express backend and Vite frontend on the same port.

### File Structure
```
client/
├── src/
│   ├── components/
│   │   ├── layout/     # Header, navigation
│   │   ├── metrics/    # Metric cards
│   │   ├── charts/     # Chart components
│   │   ├── charity/    # Charity-related components
│   │   ├── wetf/       # WETF-related components
│   │   └── ui/         # Shadcn components
│   ├── pages/          # Route pages
│   └── lib/            # Utilities, query client
server/
├── routes.ts           # API endpoints
└── storage.ts          # Data storage interface
shared/
└── schema.ts           # Shared type definitions
```

## User Preferences
- Professional financial platform aesthetic (Vanguard-inspired)
- Social impact storytelling (Kiva-inspired)
- Emphasis on transparency and measurable outcomes
- Clean, data-driven interface with SDG alignment

## Recent Changes
**2025-01-09**:
- ✅ Built complete Glass Box MVP (7 pages, localStorage persistence, PWA manifest)
- ✅ Implemented full user flow: Welcome → SDG Selection → Discover → Fund Detail → Success → Dashboard
- ✅ Added 4 vetted impact funds with complete seed data
- ✅ Fixed division-by-zero bug in dashboard impact calculations
- ✅ Enhanced landing page with compelling storytelling:
  - Problem/solution narrative structure
  - Platform stats (£9.8M raised, 525K+ lives impacted)
  - How it works (3-step process)
  - Impact examples (£50 → 200 meals)
  - Dual CTAs with smooth scroll navigation
- ✅ End-to-end testing passed: Complete user journey works from welcome to dashboard
- ✅ Mobile-first responsive design validated across all pages

## Application Architecture (As Built)
**Storage**: 100% client-side with localStorage (NO database, as requested)
**Pages**: 
- `/` - Landing page with 7-section storytelling
- `/sdg` - SDG selection with radar chart
- `/discover` - Browse 4 verified impact funds
- `/fund/:slug` - Fund details with mission, impact, and Glass Box vetting
- `/success` - Investment confirmation
- `/dashboard` - Impact tracking with charts and equivalencies

**Impact Calculations**:
- £0.25 = 1 meal
- £12,500 = 1 classroom
- £2,500 = 1 well

## Ready for Demo
The Glass Box MVP is complete and fully functional. All core requirements delivered:
- Mobile-first PWA
- No auth, payments, or server dependencies
- LocalStorage persistence
- Glass Box vetting display
- Complete impact tracking
