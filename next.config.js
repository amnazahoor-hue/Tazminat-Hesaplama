/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-icons"],
    optimizeCss: true
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox:",
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/kidem-tazminati-hesaplamasi",
        destination: "/",
        permanent: true
      },
      {
        source: "/kıdem-tazminatı-hesaplaması",
        destination: "/",
        permanent: true
      },
      {
        source: "/toplam-tazminat-hesaplama-kilavuzu",
        destination: "/tazminat-hesaplama/",
        permanent: true
      },
      {
        source: "/kidem-tazminati-tavani-turkiye-2026",
        destination: "/kidem-tazminati-tavani/",
        permanent: true
      },
      {
        source: "/ihbar-tazminati-hesaplama",
        destination: "/ihbar-tazminati-nedir/",
        permanent: true
      },
      {
        source: "/yillik-izin-ucreti-hesaplama",
        destination: "/tazminat-hesaplama/",
        permanent: true
      },
      {
        source: "/kidem-tazminati-nedir",
        destination: "/",
        permanent: true
      },
      {
        source: "/about-us",
        destination: "/hakkimizda/",
        permanent: true
      },
      {
        source: "/contact",
        destination: "/iletisim/",
        permanent: true
      },
      {
        source: "/is-kanunu",
        destination: "/",
        permanent: true
      },
      {
        source: "/tazminat-tavani-2024",
        destination: "/kidem-tazminati-tavani/",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
