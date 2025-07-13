import type { Metadata,Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: [
    'Choose Your Pet Companion"',
    'Tell & Watch Your Pet React',
    'Slide Through Moods',
    'interactive pet companion',
    'virtual pet emotions',
    'AI pet mood tracker',
  ],
  authors: [{ name: process.env.NEXT_PUBLIC_AUTHOR_NAME }],
  creator: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  publisher: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  applicationName: process.env.NEXT_PUBLIC_APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cheer My Pet - Interactive Pet Emotion Analysis',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
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
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other : {
      'msvalidate.01' : process.env.NEXT_PUBLIC_MS_VERIFICATION
    },
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
        <meta name="theme-color" content={process.env.NEXT_PUBLIC_THEME_COLOR} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content={process.env.NEXT_PUBLIC_THEME_COLOR} />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
