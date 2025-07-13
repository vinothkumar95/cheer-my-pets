import type { Metadata,Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cheer My Pet - Know your pets emotions',
  description: 'Choose one of your pet and converse with them to see them come alive with realistic emotions! Watch your pets react with emotions based on your words.',
  keywords: [
    'pet emotions',
    'pet animation',
    'interactive pets',
    'pet companion',
    'pet simulation',
    'virtual pets',
    'pet reactions',
    'pet mood analysis',
    'pet care',
    'pet interaction',
    'dog animation',
    'cat animation',
    'bird animation',
    'rabbit animation',
    'pet emotions app',
    'pet mood tracker',
    'virtual pet experience',
    'pet storytelling',
    'pet day description',
    'pet emotion analysis'
  ],
  authors: [{ name: 'Vinoth kumar Chellapandi' }],
  creator: 'Vinoth kumar Chellapandi',
  publisher: 'Vinoth kumar Chellapandi',
  applicationName: 'Cheer My Pet',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cheer-my-pet.netlify.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cheer My Pet - Interactive Pet Emotion Analysis',
    description: 'Choose one of your pet and converse with them to see them come alive with realistic emotions! Watch your pets react with emotions based on your words.',
    url: 'https://cheer-my-pet.netlify.app/',
    siteName: 'Cheer My Pet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cheer My Pet - Interactive Pet Animation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheer My Pet - Interactive Pet Emotion Analysis',
    description: 'Choose your pet and interact with it to see its emotion with realistic animation!',
    images: ['/og-image.png'],
    creator: '@cvinoth95',
    site: '@cvinoth95',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'HXFvmLoUXKNvJ7aS57HIYfIVFN6QKhxcrXbPy3p9z3A',
    yandex: 'e00a95014bddfc6f',
    yahoo: '75F12A477996BF87809F7D1162F9034E',
  },
  category: 'entertainment',
  classification: 'interactive sentiment analysis',
}

export const viewport : Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Cheer My Pet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cheer My Pet" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
