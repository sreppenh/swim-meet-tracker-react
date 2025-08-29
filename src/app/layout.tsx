import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Swim Meet Tracker',
  description: "Track swimmers' events, heats, and lanes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Standard favicon (SVG preferred) */}
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />

        {/* PNG favicons for fallback */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/swim-favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/swim-favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/swim-favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/swim-favicon-512x512.png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />

        {/* ICO fallback */}
        <link rel="icon" href="/favicon/swim-favicon.ico" sizes="any" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* Theme colors and PWA behavior */}
        <meta name="theme-color" content="#4facfe" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Swim Tracker" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
