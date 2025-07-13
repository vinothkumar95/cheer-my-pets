# Cheer My Pet

An interactive pet emotion analysis and animation platform where users can choose pets and describe their day to see realistic emotional reactions.

## Features

- 🐾 **Interactive Pet Selection**: Choose from multiple pet types (dog, cat, bird, rabbit, hamster, fish, turtle, panda)
- 🎭 **Realistic Animations**: Watch pets react with lifelike emotions and movements
- 🧠 **AI-Powered Sentiment Analysis**: Uses Hugging Face's advanced sentiment analysis model
- ⌨️ **Keyboard Navigation**: Full accessibility support with arrow keys and Enter
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cheer-my-pets
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Hugging Face API Key
# Get your API key from: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Site URL (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Get Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account or sign in
3. Go to [Settings > Tokens](https://huggingface.co/settings/tokens)
4. Create a new token with "read" permissions
5. Copy the token and add it to your `.env.local` file

## Usage

1. **Select a Pet**: Use the carousel to choose your favorite pet
2. **Describe Their Day**: Tell us about your pet's activities and experiences
3. **Watch the Magic**: See your pet react with realistic emotions and animations
4. **Try Different Scenarios**: Experiment with various descriptions to see different reactions

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS animations and transitions
- **AI**: Hugging Face sentiment analysis API
- **UI Components**: Custom components with accessibility support

## SEO Optimized

- Comprehensive meta tags
- Open Graph and Twitter Card support
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Mobile and PWA ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
