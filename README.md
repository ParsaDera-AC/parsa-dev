# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and TailwindCSS. Features a dynamic theme switcher, interactive particle background, and multilingual support.

![Portfolio Preview](public/preview.png)

## ✨ Features

- 🌓 Dynamic Dark/Light mode
- 🎨 Interactive particle background with theme integration
- 🌐 Multilingual support
- 📱 Fully responsive design
- ⚡ Next.js 13+ with App Router
- 🎭 Smooth animations with Framer Motion
- 🎯 Interactive project cards
- 📬 Contact form with validation
- 🔍 SEO optimized

## 🚀 Tech Stack

- **Framework:** Next.js 13+
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Particles:** tsParticles
- **Icons:** React Icons
- **Language Management:** Custom Context API
- **Theme Management:** Custom Theme Context
- **Code Quality:** ESLint, Prettier

## 🛠️ Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
```

2. Change the working directory
```bash
cd portfolio
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── [lang]/
│   │   └── page.js
│   ├── layout.js
│   └── globals.css
├── components/
│   ├── AboutMe.js
│   ├── AmbientBackground.js
│   ├── Contact.js
│   ├── Hero.js
│   ├── Navbar.js
│   └── Projects.js
├── context/
│   ├── LanguageContext.js
│   └── ThemeContext.js
├── public/
│   └── assets/
└── package.json
```

## 🎨 Color Reference

| Color          | Dark Mode     | Light Mode    |
| -------------- | ------------ | ------------- |
| Background     | #000000      | #FFFFFF      |
| Primary        | #A855F7      | #1F2937      |
| Secondary      | #EC4899      | #9333EA      |
| Text           | #FFFFFF      | #1F2937      |
| Accent         | #A855F7      | #7C3AED      |

## 🌟 Key Features Explained

### Dynamic Theme Switching
- Seamless transition between dark and light modes
- Theme-aware components and animations
- Persistent theme preference storage

### Interactive Particle Background
- Dynamic particle system that responds to theme changes
- Interactive hover and click effects
- Performance optimized for smooth animations

### Multilingual Support
- Built-in language switching capability
- Extensible language context
- SEO-friendly URL structure with language parameters

### Responsive Design
- Mobile-first approach
- Fluid typography and spacing
- Optimized layouts for all screen sizes

## 🔧 Environment Variables

To run this project, you might need to add the following environment variables to your .env file:

```bash
NEXT_PUBLIC_SITE_URL=your_site_url
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/portfolio/issues).

## 📝 License

This project is [MIT](./LICENSE) licensed.

## 👨‍💻 Author

**Your Name**
- Website: [your-website.com](https://your-website.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 💖 Support

Give a ⭐️ if you like this project!
