import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

const description =
  "Yoga, Pilates y movimiento consciente en Córdoba. Clases en grupos reducidos con atención individual. Consulta horarios y reserva tu plaza.";
const title = "Yoga Córdoba · Yoga, Pilates y Movimiento Consciente";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Yoga Córdoba" }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://images.pexels.com/photos/3822672/pexels-photo-3822672.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      "https://images.pexels.com/photos/3822672/pexels-photo-3822672.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
};

// No-flash theme/lang script: applies the saved theme + language to <html>
// before React hydrates, matching the previous Vite inline script behavior.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    var lang = localStorage.getItem('lang');
    if (!lang) {
      var browserLang = navigator.language.toLowerCase();
      lang = browserLang.startsWith('es') ? 'es' : 'en';
      localStorage.setItem('lang', lang);
    }
    document.documentElement.lang = lang;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
