# ARKO - Luxury Real Estate & Architecture

A premium, modern real estate website showcasing luxury properties with elegant design and smooth animations. Built with Next.js, featuring a sophisticated gold/amber color scheme and interactive hover effects throughout.

## 🏗️ Features

- **Premium Luxury Theme**: Sophisticated gold/amber color palette designed for high-end real estate clients
- **Interactive Hover Effects**: Smooth, elegant button animations with scale transforms and shadow effects
- **Glassmorphism Design**: Modern glass-effect components with backdrop blur
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Smooth Animations**: Framer Motion powered animations for seamless user experience
- **Modern UI Components**: Custom navbar with tubelight effect, animated sections, and premium styling

## 🎨 Design System

### Color Palette
- **Primary**: Premium gold/amber (`hsl(38 85% 55%)`) - Replaces standard orange for a more luxurious feel
- **Background**: Deep dark blue (`hsl(222 47% 6%)`)
- **Foreground**: Light cream (`hsl(210 40% 98%)`)
- **Accents**: Sophisticated muted tones with gold highlights

### Interactive Elements
All buttons feature premium hover effects:
- **Scale Transform**: Buttons scale to 110% on hover (105% for form buttons)
- **Shadow Effects**: Elegant glow shadows matching the button's color scheme
- **Smooth Transitions**: 300ms cubic-bezier transitions for premium feel
- **Active States**: Visual feedback on click with scale-down effect

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd real-estate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
real-estate/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main homepage with all sections
│   │   ├── layout.tsx         # Root layout with navbar
│   │   └── globals.css        # Global styles and theme configuration
│   ├── components/
│   │   └── ui/
│   │       └── tubelight-navbar.tsx  # Custom animated navbar
│   └── lib/
│       ├── constants.ts       # Image URLs and constants
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
└── package.json
```

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Next/Font** - Optimized font loading (Inter & Playfair Display)

## 🎯 Key Sections

- **Hero Section**: Full-screen hero with call-to-action buttons
- **About Section**: Company information with statistics
- **Projects Section**: Featured property listings with hover effects
- **Services Section**: Service offerings with interactive cards
- **CTA Section**: Call-to-action for consultations
- **Contact Section**: Contact form and information
- **Footer**: Social links and copyright

## 🎨 Custom Button Classes

The project uses custom CSS classes for reliable hover effects:

- `.btn-primary` - Primary gold buttons (Explore Properties, Schedule Consultation, Send Message)
- `.btn-glass` - Glass/backdrop buttons (Watch Showreel)
- `.btn-foreground` - Foreground color buttons (View All Projects)
- `.btn-white` - White background buttons (View Details in project cards)
- `.btn-submit` - Form submit buttons with adjusted scale

## 📝 Customization

### Changing Colors
Edit the color variables in `src/app/globals.css`:
```css
--color-primary: hsl(38 85% 55%); /* Change this for different accent color */
```

### Modifying Hover Effects
Adjust button hover styles in `src/app/globals.css` under the button class definitions.

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with attention to detail for luxury real estate clients, featuring premium design elements and smooth user interactions throughout.
