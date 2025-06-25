# CTea Newsroom 🫖

**Where Crypto Twitter Comes to Spill**

CTea Newsroom is an anonymous crypto gossip platform where the crypto community can submit, score, and discuss the hottest alpha leaks, market takes, and spicy rumors. Built with React, TypeScript, and Supabase.

## ✨ Features

### 🎯 Core Functionality
- **Anonymous Tea Submission** - Submit crypto gossip without revealing identity
- **Community Voting** - Hot/Cold/Spicy reaction system
- **Leaderboard** - Track top contributors and viral posts
- **Real-time Feed** - Live updates of trending submissions
- **$TEA Points System** - Earn rewards for quality content

### 🎨 User Experience
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark/Light Mode** - Toggle between themes
- **Smooth Animations** - Engaging micro-interactions
- **Accessibility** - WCAG compliant design
- **SEO Optimized** - Meta tags, structured data, and performance

### 🔧 Technical Features
- **TypeScript** - Full type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **Supabase** - Backend as a service
- **Analytics** - Google Analytics integration
- **PWA Ready** - Progressive web app capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/goss-tea-verse.git
   cd goss-tea-verse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_ANALYTICS_ID=your_ga_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Navigation.tsx  # Main navigation
│   ├── Footer.tsx      # Site footer
│   ├── TeaFeed.tsx     # Main feed component
│   ├── Leaderboard.tsx # Leaderboard component
│   └── ...
├── pages/              # Page components
│   ├── Landing.tsx     # Homepage
│   ├── Feed.tsx        # Main feed page
│   ├── SubmitTea.tsx   # Submission form
│   ├── About.tsx       # About page
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # Third-party integrations
└── main.tsx           # App entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: `#00d1c1` (Teal)
- **Secondary**: `#ff61a6` (Pink)
- **Accent**: `#9b59b6` (Purple)
- **Success**: `#00d4aa` (Green)
- **Warning**: `#f1c40f` (Yellow)
- **Error**: `#ff6b35` (Orange)

### Typography
- **Primary Font**: Montserrat (Headings)
- **Secondary Font**: Inter (Body text)
- **Monospace**: JetBrains Mono (Code)

### Components
Built with [Shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components.

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.ts` with:
- Custom color palette
- Animation keyframes
- Responsive breakpoints
- Dark mode support

### Vite
Optimized build configuration with:
- React SWC for fast compilation
- TypeScript support
- Environment variable handling
- Asset optimization

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | Homepage with hero and CTA |
| `/feed` | Feed | Main tea feed with submissions |
| `/submit` | SubmitTea | Anonymous submission form |
| `/campaigns` | Campaigns | Leaderboard and campaigns |
| `/about` | About | About page and team info |
| `/contact` | Contact | Contact form and info |
| `/privacy` | Privacy | Privacy policy |
| `/terms` | Terms | Terms of service |
| `/*` | NotFound | 404 error page |

## 🔌 API Integration

### Supabase
- **Authentication**: Anonymous tokens for user tracking
- **Database**: PostgreSQL for submissions and reactions
- **Real-time**: Live updates for feed and leaderboard
- **Edge Functions**: AI commentary generation

### Analytics
- **Google Analytics**: Page views, events, conversions
- **Custom Events**: CTA clicks, form completions, tea spills

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔒 Security & Privacy

- **Anonymous by Design**: No personal data collection
- **Encrypted Storage**: All data encrypted at rest
- **HTTPS Only**: Secure connections required
- **Content Moderation**: Community-driven reporting system
- **GDPR Compliant**: Privacy-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commits
- Write meaningful commit messages
- Test on multiple devices
- Ensure accessibility compliance

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for user experience
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Supabase Connection**
- Verify environment variables
- Check Supabase project settings
- Ensure RLS policies are configured

**Styling Issues**
- Clear browser cache
- Check Tailwind CSS compilation
- Verify class names

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Supabase](https://supabase.com/) for backend services
- [Lucide React](https://lucide.dev/) for icons
- [React Router](https://reactrouter.com/) for routing

## 📞 Support

- **Email**: hello@cteanews.com
- **Twitter**: [@ctea_newsroom](https://twitter.com/ctea_newsroom)
- **Discord**: [CTea Community](https://discord.gg/ctea)

---

**Made with ☕ by the CTea Team**

## Build Mode Banner

To enable the dismissible build mode banner at the top of the site, add the following to your `.env` file:

```
VITE_BUILD_MODE=true
```

Set to `false` or remove to hide the banner in production.
