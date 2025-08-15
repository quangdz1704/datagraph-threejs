# Data Graph Mindshare - Three.js Edition

A React TypeScript application featuring a dynamic 3D rotating sphere with interactive bubbles using Three.js and React Three Fiber, built with Vite for lightning-fast development.

## 🚀 Features

- **True 3D Rendering**: Built with Three.js for realistic 3D graphics
- **Interactive Bubbles**: Click on empty bubbles to interact with them
- **Smooth Animations**: Real-time 3D animations with proper lighting and materials
- **TypeScript**: Full type safety and better development experience
- **Responsive Design**: Optimized for different screen sizes
- **Realistic Lighting**: Ambient and point lights for depth and realism
- **Fast Development**: Vite-powered for instant hot module replacement

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Three.js** for 3D graphics
- **React Three Fiber** for React integration with Three.js
- **React Three Drei** for useful Three.js helpers
- **Styled Components** for styling
- **ESLint** for code quality

## 📦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:

   ```bash
   cd data-graph-mindshare
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎮 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎮 How to Use

- The 3D sphere will automatically start rotating when the page loads
- **Mouse Controls:**
  - **Scroll** to zoom in/out
  - **Click + drag** to rotate the sphere around its center
  - **Right-click + drag** to pan the view
  - **Click on bubbles** to interact with them
- Hover over bubbles to see them scale up and glow
- The auto-rotation pauses when you start controlling the camera
- Realistic lighting and materials create depth and visual appeal

## 🎨 Key Improvements Over CSS Version

- **True 3D**: Real 3D geometry instead of CSS transforms
- **Better Performance**: Hardware-accelerated 3D rendering
- **Realistic Lighting**: Dynamic lighting with shadows and reflections
- **Smooth Interactions**: Native 3D mouse interactions
- **Scalable**: Easy to add more complex 3D effects and animations
- **Fast Development**: Vite provides instant hot module replacement

## 🔧 Customization

You can easily customize the visualization by modifying the `bubbleData` array in `src/components/RotatingBubbles.tsx`:

- Add new bubbles with different content
- Change colors and materials
- Modify the rotation speed and animation parameters
- Add more complex 3D effects and interactions
- Adjust lighting and camera settings

## 📁 Project Structure

```
data-graph-mindshare/
├── index.html                 # Main HTML file (Vite)
├── src/
│   ├── components/
│   │   └── RotatingBubbles.tsx    # Main 3D component
│   ├── App.tsx                    # Main app component
│   ├── index.tsx                  # Entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts              # Vite types
├── package.json
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # Node.js TypeScript config
├── vite.config.ts                 # Vite configuration
├── .eslintrc.cjs                  # ESLint configuration
└── README.md
```

## 🎯 3D Features

- **Spherical Distribution**: Bubbles are distributed on a perfect sphere using mathematical formulas
- **Dynamic Rotation**: Smooth rotation around multiple axes
- **Interactive Materials**: Bubbles respond to hover and click with material changes
- **Realistic Lighting**: Multiple light sources for depth and atmosphere
- **Performance Optimized**: Efficient 3D rendering with proper geometry and materials
- **Mouse Controls**: Full camera control with zoom, rotate, and pan functionality
- **Smart Auto-Rotation**: Auto-rotation pauses when user takes control

## ⚡ Vite Benefits

- **Lightning Fast**: Instant server start and hot module replacement
- **Modern Build**: ES modules and modern JavaScript features
- **Optimized Production**: Efficient bundling and tree shaking
- **TypeScript Support**: Native TypeScript support without additional configuration
- **Plugin Ecosystem**: Rich ecosystem of plugins and integrations
