import './globals.css'

const title = 'Tanay Shah · Software Developer in Test'
const description =
  'Tanay Shah — Software Developer in Test at Ericsson in Ottawa, specializing in Java test automation for 5G telecommunications hardware.'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'profile',
    locale: 'en_CA',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e1116' },
    { media: '(prefers-color-scheme: light)', color: '#e2e6ec' },
  ],
}

// Runs before first paint so the page never flashes the wrong theme:
// saved choice first, otherwise the visitor's system setting.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t}catch(e){d.dataset.theme='dark'}})()`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Root layout applies to every route, so the pages/_document rule doesn't apply here. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
