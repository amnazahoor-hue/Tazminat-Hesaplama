/** Local assets under /public/images */
export const IMAGES = {
  logo: "/images/logo.svg",
  icon: "/favicon-32.png",
  home: {
    heroCarouselLira: "/images/home/hero-carousel-lira.webp",
    heroCarousel1: "/images/home/hero-carousel-1.webp",
    heroCarousel2: "/images/home/hero-carousel-2.webp",
    heroCarousel3: "/images/home/hero-carousel-3.webp",
    introSeveranceBg: "/images/home/intro-severance-bg.webp",
    freeCalcOffice: "/images/home/free-calc-office.webp",
    featureResultsSalary: "/images/home/feature-results-salary.webp",
    howStepsAge: "/images/home/how-steps-age.webp",
    featureTaxCoin: "/images/home/feature-tax-coin.webp",
    featureTaxWallet: "/images/home/feature-tax-wallet.webp",
    employerWhyCalculatorBg: "/images/home/employer-why-calculator-bg.webp",
    employerWhyBg: "/images/home/employer-why-bg.webp",
    diffPurpleSalary: "/images/home/diff-purple-salary.webp"
  },
  tazminatHesaplama: {
    hero: "/images/tazminat-hesaplama/hero.webp"
  },
  guides: {
    stepsOffice: "/images/guides/guide-steps-office.webp"
  },
  author: {
    portrait: "/images/author/evren-mazi-portrait.webp"
  }
};

/** Alt + title for every site image (accessibility, SEO, hover tooltips). */
export const IMAGE_META = {
  [IMAGES.logo]: {
    alt: "Tazminat Hesaplama logosu",
    title: "Tazminat Hesaplama — Kıdem tazminatı hesaplayıcısı"
  },
  [IMAGES.home.heroCarouselLira]: {
    alt: "Türk Lirası sembolü ile kıdem tazminatı hesaplama tanıtım görseli",
    title: "Kıdem tazminatı hesaplama — Türk Lirası"
  },
  [IMAGES.home.heroCarousel1]: {
    alt: "Ofiste kıdem tazminatı hesaplaması yapan çalışanlar",
    title: "Ücretsiz kıdem tazminatı hesaplayıcısı"
  },
  [IMAGES.home.heroCarousel2]: {
    alt: "Maaş ve tazminat belgeleri üzerinde hesaplama yapan uzman",
    title: "Kıdem ve ihbar tazminatı hesaplama aracı"
  },
  [IMAGES.home.heroCarousel3]: {
    alt: "İş hukuku rehberi ve tazminat hesaplama ekranı görseli",
    title: "Tazminat hesaplama platformu tanıtımı"
  },
  [IMAGES.home.introSeveranceBg]: {
    alt: "Kıdem ve işten ayrılma tazminatı hesaplama rehberi — tazminat türleri bölümü arka plan görseli",
    title: "İşten çıkarma tazminatı türleri"
  },
  [IMAGES.home.freeCalcOffice]: {
    alt: "Ofiste laptop ile ücretsiz kıdem tazminatı hesaplaması yapan çalışanlar",
    title: "Ücretsiz kıdem tazminatı hesaplayıcısı"
  },
  [IMAGES.home.featureResultsSalary]: {
    alt: "Maaş bordrosu ve nakit ödeme belgeleri",
    title: "Tazminat hesaplama sonuçları ve maaş bordrosu"
  },
  [IMAGES.home.howStepsAge]: {
    alt: "Mavi hesap makinesi kullanan çalışan",
    title: "Yaş faktörü ile tazminat hesaplama"
  },
  [IMAGES.home.featureTaxCoin]: {
    alt: "Altın madeni para ve vergi tahmini görseli",
    title: "Tazminat vergi tahmini"
  },
  [IMAGES.home.featureTaxWallet]: {
    alt: "Kırmızı cüzdandan Türk Lirası banknotları çıkaran kişi",
    title: "Nihai tazminat ödemesi tahmini"
  },
  [IMAGES.home.employerWhyCalculatorBg]: {
    alt: "İşverenler için kıdem tazminatı ödemesi ve hesaplama paneli arka plan görseli",
    title: "İşverenler için kıdem tazminatı hesaplama"
  },
  [IMAGES.home.employerWhyBg]: {
    alt: "İşveren ve çalışan arasında kıdem tazminatı görüşmesi görseli",
    title: "İşverenler neden kıdem tazminatı öder?"
  },
  [IMAGES.home.diffPurpleSalary]: {
    alt: "Maaş ve tazminat ödemesi görseli",
    title: "Kıdem ve ihbar tazminatı farkı"
  },
  [IMAGES.tazminatHesaplama.hero]: {
    alt: "Toplam tazminat hesaplama rehberi arka plan görseli",
    title: "Toplam tazminat hesaplama kılavuzu"
  },
  [IMAGES.guides.stepsOffice]: {
    alt: "Tazminat hesaplama sürecini gösteren ofis toplantısı görseli",
    title: "Tazminat hesaplama adımları"
  },
  [IMAGES.author.portrait]: {
    alt: "Doç. Dr. Evren Mazı — kurgusal iş hukuku uzmanı profesyonel portre fotoğrafı",
    title: "Doç. Dr. Evren Mazı — Yazar profili"
  },
  "/images/ihbar/hero.webp": {
    alt: "Şehir manzaralı modern ofiste çalışan profesyonel ekip görseli",
    title: "İhbar tazminatı nedir? — Rehber görseli"
  },
  "/images/ihbar/kidem.webp": {
    alt: "Finans hesaplama masası ve hesap makinesi görseli",
    title: "Kıdem ve ihbar tazminatı karşılaştırması"
  },
  "/images/ihbar/rights.webp": {
    alt: "İhbar süresi boyunca ofiste çalışan profesyonel ekip görseli",
    title: "İhbar süresi ve çalışan hakları"
  },
  "/images/tavan/hero.webp": {
    alt: "Severance Pay yazılı not ve dolar banknotları — kıdem tazminatı görseli",
    title: "Kıdem tazminatı tavanı 2026"
  }
};

/** @param {string} [src] */
export function getImageMeta(src) {
  if (!src) return null;
  return IMAGE_META[src] ?? null;
}

/** Backward-compatible alt strings for legacy imports. */
export const IMAGE_ALTS = {
  introSeveranceBg: IMAGE_META[IMAGES.home.introSeveranceBg].alt,
  freeCalcOffice: IMAGE_META[IMAGES.home.freeCalcOffice].alt,
  employerWhyCalculatorBg: IMAGE_META[IMAGES.home.employerWhyCalculatorBg].alt
};
