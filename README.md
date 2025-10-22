# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices (mobile, tablet, desktop)
- **Dark Mode**: Toggle between light and dark themes with persistent preference storage
- **TypeScript**: Fully typed for better development experience and fewer bugs
- **Modern UI**: Clean, modern design with smooth animations and transitions
- **Sections**:
  - Hero/About section with introduction
  - Projects showcase with tags and links
  - Skills section with visual progress indicators
  - Contact form with validation

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
my-portfolios/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Hero.tsx         # Hero/About section
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── Skills.tsx       # Skills section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── ThemeProvider.tsx # Theme context provider
│   │   └── ThemeToggle.tsx  # Dark mode toggle
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript types
├── public/                  # Static assets
└── package.json
```

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change name, title, and bio
   - Update profile initials or add profile image

2. **Projects** (`src/components/Projects.tsx`):
   - Update the `projects` array with your own projects
   - Add project descriptions, tags, and links

3. **Skills** (`src/components/Skills.tsx`):
   - Modify the `skillCategories` array with your skills
   - Adjust skill levels (0-100)

4. **Contact Info** (`src/components/Contact.tsx`):
   - Update email, phone, and location
   - Implement actual form submission logic

5. **Footer** (`src/components/Footer.tsx`):
   - Add your social media links
   - Update copyright information

### Color Scheme

Edit `src/app/globals.css` to change colors:

```css
:root {
  --primary: #3b82f6;    /* Blue */
  --secondary: #8b5cf6;  /* Purple */
  --accent: #10b981;     /* Green */
}
```

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import the repository on Vercel
3. Vercel will automatically detect Next.js and deploy

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

