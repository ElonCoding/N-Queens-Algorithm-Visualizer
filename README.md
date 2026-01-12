# N-Queens Algorithm Visualizer

A modern, accessible, and performant web application for visualizing the N-Queens backtracking algorithm.

## 🎯 Overview

The N-Queens Algorithm Visualizer is an interactive educational tool that demonstrates how the backtracking algorithm solves the classic N-Queens problem. Built with modern web standards, it provides a comprehensive learning experience with full accessibility support.

## ✨ Features

- **Interactive Visualization**: Watch the algorithm solve N-Queens problems in real-time
- **Multiple Board Sizes**: Support for 4x4 to 8x8 chess boards
- **Adjustable Speed**: Control animation speed from slow to very fast
- **Accessibility First**: Full WCAG 2.1 AA compliance with screen reader support
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Performance Optimized**: Efficient algorithms and DOM updates
- **Offline Support**: Service worker for offline functionality
- **SEO Optimized**: Comprehensive metadata and structured data

## 🏗️ Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Build Tools**: None required (vanilla implementation)
- **Testing**: Jest with Puppeteer for E2E testing
- **Deployment**: Static hosting compatible

### File Structure
```
nqueens-visualizer/
├── index.html              # Main HTML file with semantic markup
├── styles/
│   └── main.css           # Modern CSS with custom properties
├── scripts/
│   └── app.js             # Core JavaScript functionality
├── sw.js                    # Service worker for offline support
├── manifest.json           # Web app manifest
├── tests/
│   ├── unit.test.js       # Unit tests
│   ├── integration.test.js # Integration tests
│   ├── e2e.test.js        # End-to-end tests
│   ├── package.json       # Test dependencies
│   └── jest.setup.js      # Test configuration
└── docs/
    └── DEPLOYMENT.md      # Deployment guide
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Node.js 14+ (for development and testing)

### Installation

1. **Clone or download** the project files
2. **Serve locally** using any static file server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Open browser** to `http://localhost:8000`

### Development Setup

1. **Install test dependencies**:
   ```bash
   cd tests
   npm install
   ```

2. **Run tests**:
   ```bash
   npm test                 # Run all tests
   npm run test:unit        # Unit tests only
   npm run test:integration # Integration tests
   npm run test:e2e         # End-to-end tests
   npm run test:coverage    # Generate coverage report
   ```

## 🎮 Usage

### Basic Usage
1. **Select board size** using the dropdown (4x4 to 8x8)
2. **Choose animation speed** (Slow to Very Fast)
3. **Click "Start Visualization"** to begin
4. **Watch the algorithm** find all valid queen placements
5. **View solutions** in the solutions gallery

### Advanced Features
- **Keyboard Navigation**: Use arrow keys to navigate the board
- **Screen Reader Support**: Status updates announced automatically
- **Progress Tracking**: Real-time statistics and progress bar
- **Solution Gallery**: View all found solutions

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Core algorithm logic and DOM manipulation
- **Integration Tests**: Component interactions and data flow
- **End-to-End Tests**: Complete user journeys and accessibility
- **Performance Tests**: Load times and animation smoothness

### Running Tests
```bash
cd tests
npm install
npm test                    # All tests
npm run test:coverage      # With coverage report
npm run test:watch         # Watch mode
```

### Test Structure
- **unit.test.js**: Algorithm logic, DOM updates, accessibility features
- **integration.test.js**: Component interactions, responsive behavior
- **e2e.test.js**: User journeys, visual regression, performance

## 📱 Browser Support

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 80+ | Full support |
| Firefox | 75+ | Full support |
| Safari | 13+ | Full support |
| Edge | 80+ | Full support |
| Mobile Safari | 13+ | Touch support |
| Chrome Mobile | 80+ | Touch support |

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: ARIA labels and live regions
- **Color Contrast**: Meets WCAG AA standards (4.5:1 ratio)
- **Focus Management**: Clear focus indicators and logical tab order
- **Alternative Text**: Descriptive labels for all interactive elements

### Assistive Technology Support
- **Screen Readers**: JAWS, NVDA, VoiceOver, TalkBack
- **Keyboard Only**: Complete functionality without mouse
- **High Contrast**: Works with Windows High Contrast mode
- **Zoom**: Supports up to 200% zoom without horizontal scrolling

## 🔧 Configuration

### CSS Custom Properties
```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --animation-speed: 0.3s;
  --border-radius: 8px;
}
```

### JavaScript Configuration
```javascript
const config = {
  animationSpeeds: {
    slow: 1000,
    medium: 500,
    fast: 250,
    veryFast: 100
  },
  boardSizes: [4, 5, 6, 7, 8],
  maxSolutions: 1000
};
```

## 📊 Performance

### Optimization Features
- **DOM Caching**: Elements cached for better performance
- **Batch Updates**: DOM updates batched to prevent reflows
- **Efficient Algorithms**: Optimized backtracking implementation
- **Lazy Loading**: Solutions loaded on demand
- **Service Worker**: Offline functionality and caching

### Performance Metrics
- **Load Time**: < 2 seconds on 3G
- **First Paint**: < 1 second
- **Time to Interactive**: < 3 seconds
- **Animation Smoothness**: 60 FPS target

## 🔒 Security

### Security Features
- **Content Security Policy**: Prevents XSS attacks
- **HTTPS Only**: Requires secure connection
- **No External Dependencies**: Reduces attack surface
- **Input Validation**: All user inputs sanitized
- **Secure Headers**: Proper security headers configured

## 📝 SEO and Social Media

### SEO Features
- **Semantic HTML**: Proper heading structure and landmarks
- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Structured Data**: Schema.org JSON-LD for better search results
- **Open Graph**: Social media preview cards
- **Twitter Cards**: Twitter-specific meta tags
- **Sitemap**: XML sitemap for search engines

### Social Media Integration
```html
<meta property="og:title" content="N-Queens Algorithm Visualizer">
<meta property="og:description" content="Interactive visualization of the N-Queens backtracking algorithm">
<meta property="og:image" content="https://nqueens-visualizer.com/preview.png">
<meta property="og:url" content="https://nqueens-visualizer.com">
```

## 🛠️ Troubleshooting

### Common Issues

1. **Algorithm not starting**
   - Check browser console for errors
   - Ensure JavaScript is enabled
   - Verify all files are loaded correctly

2. **Animations not smooth**
   - Try reducing board size
   - Increase animation speed
   - Check browser performance tab

3. **Accessibility issues**
   - Verify ARIA attributes are present
   - Test with screen reader
   - Check keyboard navigation

4. **Mobile display problems**
   - Test in device emulation mode
   - Check viewport meta tag
   - Verify responsive CSS is loading

### Debug Mode
Enable debug mode by adding `?debug=true` to the URL for detailed logging.

## 🤝 Contributing

### Development Guidelines
1. **Follow semantic HTML** principles
2. **Maintain accessibility** standards
3. **Write comprehensive tests** for new features
4. **Document all changes** in this README
5. **Test across browsers** and devices

### Code Style
- Use **semantic HTML5** elements
- Follow **BEM CSS** methodology
- Use **meaningful variable names** in JavaScript
- **Comment complex algorithms** for clarity
- **Maintain consistent indentation** (2 spaces)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Algorithm inspiration**: Classic computer science backtracking problem
- **Accessibility guidelines**: WCAG 2.1 documentation
- **Performance best practices**: Google Web Fundamentals
- **Testing frameworks**: Jest and Puppeteer communities

---

**Happy visualizing!** ♛♛♛♛♛