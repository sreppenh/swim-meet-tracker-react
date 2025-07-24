import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Swim Meet Tracker',
  description: 'Track swimmers\' events, heats, and lanes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />

        {/* Additional favicon sizes */}
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* Theme colors and mobile app settings */}
        <meta name="theme-color" content="#4facfe" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Swim Tracker" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  )
}