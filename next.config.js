/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/kidem-tazminati-hesaplamasi",
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
      }
    ];
  }
};

module.exports = nextConfig;
