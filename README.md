# Global Economic Dashboard

An interactive dashboard for visualizing and comparing global economic indicators across different countries and regions.

## Live Demo
https://zesty-raindrop-2fc1de.netlify.app/

## Features

- **Interactive World Map**
  - Click-to-select countries
  - Region-based filtering
  - Zoom and pan capabilities
  - Visual feedback for selected countries

- **Country Comparison**
  - Compare economic indicators between two countries
  - Region-based country filtering
  - Multiple economic indicators:
    - GDP per Capita
    - Inflation Rate
    - Unemployment Rate
    - Trade Balance
    - Foreign Direct Investment (FDI)

- **Data Visualization**
  - Line charts for trend analysis
  - Interactive tooltips
  - Responsive design
  - Dark/Light mode support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - shadcn/ui
  - Radix UI primitives
- **Data Visualization**:
  - react-simple-maps (World Map)
  - Recharts (Charts)
- **Data Source**: World Bank API

## Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm (Package Manager)

### Installation

1. Clone the repository:
bash
git clone https://github.com/yourusername/global-economic-dashboard.git
cd global-economic-dashboard

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
global-economic-dashboard/
├── app/
│   ├── layout.tsx        # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── charts/          # Chart components
│   ├── ui/              # UI components
│   ├── world-map.tsx    # Interactive map component
│   └── country-comparison.tsx
├── lib/
│   └── api.ts           # World Bank API integration
└── public/
```

## API Integration

The dashboard uses the World Bank API v2 to fetch:
- Country information
- Economic indicators
- Historical data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- World Bank for providing the economic data API
- shadcn/ui for the component library
- react-simple-maps for the interactive world map
- Recharts for the charting library