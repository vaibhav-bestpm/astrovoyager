# 🌟 Cosmic Astrology App

> **Discover Your Cosmic Blueprint with AI-Powered Astrology**

A comprehensive astrology application featuring birth chart generation, personalized predictions, and compatibility analysis with a mystical design that brings the cosmos to your fingertips.

![Cosmic Theme](https://img.shields.io/badge/Theme-Cosmic%20Purple%20%26%20Gold-blueviolet)
![Platform](https://img.shields.io/badge/Platform-Web%20%26%20Mobile-blue)
![Status](https://img.shields.io/badge/Status-Ready%20for%20Mobile%20Conversion-green)

## ✨ Features

### 🔮 Core Astrology Features
- **Birth Chart Generation** - Complete Kundali with Vedic calculations
- **Daily/Weekly/Monthly Predictions** - Personalized cosmic insights
- **Compatibility Analysis** - Relationship harmony scoring
- **Nakshatra & Pada Calculations** - Detailed astrological positions
- **Planetary Transit Tracking** - Real-time cosmic movements

### 🎨 Mystical Design
- **Cosmic Theme** - Deep purple gradients with gold accents
- **Celestial Motifs** - Stars, planets, and mystical symbols
- **Responsive Design** - Beautiful on all screen sizes
- **Smooth Animations** - Engaging user experience

### 💎 Premium Features
- **Advanced Chart Analysis** - Detailed interpretations
- **Extended Predictions** - Long-term forecasts
- **Priority Support** - Enhanced user experience
- **Export Options** - Save and share charts

## 🚀 Quick Start

### Web Version (Current)
```bash
# Clone the repository
git clone https://github.com/yourusername/astrology-app.git
cd astrology-app/web-version

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your database URL and API keys

# Run the application
npm run dev
```

### Mobile Version (Coming Soon)
Follow the complete React Native conversion guide in `/docs/REACT_NATIVE_CONVERSION_GUIDE.md`

## 📱 Versions

| Version | Status | Description |
|---------|--------|-------------|
| **Web App** | ✅ Complete | Full-featured React + Express application |
| **Mobile App** | 🔄 In Progress | React Native for Android & iOS |

## 🛠 Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Shadcn/UI** components

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Passport.js** for authentication

### Mobile (Planned)
- **React Native** with TypeScript
- **React Navigation** for routing
- **React Native Paper** for UI
- **Firebase** for authentication

## 📊 Database Schema

```sql
-- Users table with cosmic profiles
users (id, email, firstName, lastName, profileImageUrl)

-- Birth charts with complete astrological data
birth_charts (id, userId, fullName, birthDate, birthLocation, chartData)

-- Personalized predictions
predictions (id, userId, chartId, type, category, content, validFrom, validTo)

-- Compatibility analyses
compatibility_analyses (id, userId, chart1Id, chart2Id, overallScore, analysis)

-- Premium subscriptions
subscriptions (id, userId, plan, status, expiresAt)

-- Transit events
transit_events (id, planetName, signName, eventDate, description)
```

## 🎯 Roadmap

### Phase 1: Web Foundation ✅
- [x] Complete authentication system
- [x] Birth chart generation
- [x] Prediction algorithms
- [x] Compatibility analysis
- [x] Premium subscription system
- [x] Mystical UI design

### Phase 2: Mobile Conversion 🔄
- [ ] React Native project setup
- [ ] Screen component conversion
- [ ] Firebase authentication integration
- [ ] Mobile-optimized birth chart visualization
- [ ] Push notifications for daily predictions
- [ ] App store preparation

### Phase 3: Advanced Features 🚀
- [ ] Real-time transit notifications
- [ ] Social sharing capabilities
- [ ] Offline chart storage
- [ ] Voice-guided readings
- [ ] AR constellation viewer

## 🌙 Screenshots

### Web Application
*Landing Page with Cosmic Design*
*Dashboard with Personalized Predictions*
*Interactive Birth Chart Visualization*
*Compatibility Analysis Interface*

### Mobile App (Coming Soon)
*Native iOS and Android Experience*

## 🔧 Development

### Prerequisites
- Node.js 16+
- PostgreSQL database
- Git

### Environment Variables
```bash
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key
REPL_ID=your-repl-id
REPLIT_DOMAINS=your-domains
```

### Development Workflow
```bash
# Start development server
npm run dev

# Run database migrations
npm run db:push

# Build for production
npm run build
```

## 📱 Mobile Development

Ready to start building the mobile version? Check out our comprehensive guides:

- 📖 [React Native Conversion Guide](./docs/REACT_NATIVE_CONVERSION_GUIDE.md)
- 🚀 [Git Repository Setup](./docs/GIT_REPOSITORY_SETUP.md)
- 📦 [Download Package Instructions](./docs/DOWNLOAD_PACKAGE_README.md)

## 🤝 Contributing

We welcome contributions to make this cosmic app even better!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m '✨ Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Vedic astrology calculations and traditions
- Open source React and React Native communities
- Cosmic design inspiration from the universe itself

---

**Ready to explore the cosmos?** 🌌 Start your astrological journey today and discover what the stars have in store for you!

[**Try the Web App**](https://your-app-url.com) | [**Download Mobile Version**](./docs/DOWNLOAD_PACKAGE_README.md) | [**View Documentation**](./docs/)

*Built with ✨ cosmic energy and 💫 stellar code*