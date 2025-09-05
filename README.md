# Yoonet BPO Qualification Tool

A comprehensive Next.js application for qualifying and routing potential BPO clients based on their business needs, cultural fit, and practical requirements.

## Features

### 🎯 Multi-Stage Qualification Flow
- **Stage 1**: Initial qualification (business type, team size, pain points, timeline)
- **Stage 2**: Industry-specific expertise demonstration
- **Stage 3**: Cultural fit and values alignment assessment
- **Stage 4**: Practical requirements and contact information
- **Results**: Dynamic scoring and personalized recommendations

### 💾 Smart Features
- Progressive save with session persistence
- Dynamic question routing based on business type
- Real-time scoring algorithm
- Mobile-responsive design
- Smooth animations with Framer Motion

### 🏢 Industry Specialization
- Healthcare & Allied Health
- E-commerce & Digital Agencies
- Accounting & Bookkeeping Firms
- Marketing & Creative Agencies

## Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd nextjs

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page
│   └── qualification/
│       └── page.tsx             # Main qualification flow
├── components/
│   └── qualification/
│       ├── Stage1.tsx           # Initial qualification
│       ├── Stage2.tsx           # Expertise demonstration
│       ├── Stage3.tsx           # Cultural fit assessment
│       ├── Stage4.tsx           # Practical requirements
│       ├── Results.tsx          # Dynamic results page
│       └── ProgressBar.tsx     # Progress indicator
├── lib/
│   ├── types.ts                # TypeScript type definitions
│   ├── constants.ts            # Question options and constants
│   ├── scoring.ts              # Scoring algorithm
│   └── utils.ts                # Utility functions
└── store/
    └── qualification-store.ts   # Zustand state management
```

## Key Features Implementation

### Scoring Algorithm
- Base scores by business type (Healthcare: 30 points, E-commerce: 25 points, etc.)
- Modifiers for team size, urgency, cultural alignment
- Penalties for poor fit indicators
- Automatic categorization: Hot (70+), Warm (50-69), Nurture (30-49), Redirect (<30)

### Dynamic Routing
- Questions adapt based on business type selection
- Financial/Legal services redirected to alternatives
- Special handling for existing BPO users

### Data Persistence
- Automatic session saving using Zustand persist
- Resume capability for incomplete qualifications
- Session tracking with unique IDs

## Customization

### Adding New Industries
1. Add business type to `lib/types.ts`
2. Update `BUSINESS_TYPE_OPTIONS` in `lib/constants.ts`
3. Add industry-specific questions in `Stage2.tsx`
4. Update scoring rules in `lib/scoring.ts`

### Modifying Scoring
Edit thresholds in `lib/constants.ts`:
```typescript
export const SCORING_THRESHOLDS = {
  hot: 70,
  warm: 50,
  nurture: 30,
  redirect: 0
};
```

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` for any API integrations:
```
NEXT_PUBLIC_CALENDLY_URL=your-calendly-url
NEXT_PUBLIC_CRM_API_KEY=your-crm-key
```

## Integration Points

The application is ready for integration with:
- **Calendly**: For booking strategy calls
- **CRM Systems**: Lead capture and nurturing
- **Email Marketing**: Automated follow-up sequences
- **Analytics**: Conversion tracking and optimization

## Testing

Run the development server and test the complete flow:
1. Navigate to homepage
2. Click "Find Your Perfect Team" 
3. Complete all qualification stages
4. Review personalized results
5. Test different paths (healthcare, e-commerce, redirect scenarios)

## Performance

- Turbopack enabled for faster development builds
- Optimized with React Server Components where applicable
- Progressive enhancement for better mobile experience
- Lazy loading for stage components

## License

Private - Yoonet BPO

## Support

For questions or issues, contact hello@yoonet.com.au