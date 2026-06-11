export const TAVAN_HERO_STAT = {
  value: "64.948,77 TL",
  label: "Ocak–Haziran 2026"
};

export const TAVAN_DEFINITION_POINTS = [
  {
    id: "below",
    text: "Tavan maaşın altında kazanan çalışanlar, gerçek brüt maaşlarına göre kıdem tazminatı alırlar."
  },
  {
    id: "above",
    text: "Tavan maaşın üzerinde kazanan çalışanlar ise, izin verilen maksimum tutara göre kıdem tazminatı alırlar."
  }
];

export const LEGAL_BASIS_ROWS = [
  { source: "5434 Sayılı Kanun", definition: "Kamu Görevlileri Emeklilik Fonu Yasası" },
  { source: "Resmi Gazete", definition: "Resmi güncellemeleri ve duyuruları yayınlar." },
  { source: "Hazine ve Hesaplar Bakanlığı", definition: "Güncellenmiş tavan tutarlarını duyurdu." },
  { source: "Finansal ve Sosyal Haklar Genelgesi", definition: "Revize edilmiş hesaplama rakamlarını içerir" }
];

export const OFFICIAL_TAVAN_ROW = {
  period: "Ocak – Haziran 2026",
  amount: "64,948.77 TL"
};

export const AFFECTED_GROUPS = [
  "Üst düzey yöneticiler",
  "yöneticiler",
  "çalışanlar",
  "direktörler",
  "Yüksek maaşlı yabancı çalışanlar"
];

export const YEARLY_COMPARISON_ROWS = [
  { period: "Ocak – Haziran 2025", amount: "41,828.42 TL", numeric: 41828.42 },
  { period: "Temmuz – Aralık 2025", amount: "53,919.68 TL", numeric: 53919.68 },
  { period: "Ocak – Haziran 2026", amount: "64,948.77 TL", numeric: 64948.77 }
];

export const HISTORY_ROWS = [
  { period: "Ocak-Haziran 2026", amount: "64,948.77" },
  { period: "Temmuz–Aralık 2025", amount: "53,919.68" },
  { period: "Ocak-Haziran 2025", amount: "41,828.42" },
  { period: "2024 Birinci Dönem", amount: "Bakanlık tarafından duyuruldu" },
  { period: "2023 Birinci Dönem", amount: "Bakanlık tarafından duyuruldu" },
  { period: "2022 İkinci Dönem", amount: "Bakanlık tarafından duyuruldu" }
];

export const GROSS_INCLUDES = [
  "Temel maaş",
  "Düzenli ikramiyeler",
  "Yemek yardımı",
  "Ulaşım yardımı",
  "Diğer düzenli ödemeler"
];

export const BELOW_CEILING_ITEMS = ["Maaş = 50,000 TL,", "2026 tavan oranı = 64,948.77 TL", "Hesaplama esası = 50,000 TL"];

export const ABOVE_CEILING_ITEMS = [
  "Maaş ise = 90,000 TL",
  "2026 tavan oranı = 64,948.77 TL",
  "Hesaplama esası = 64,948.77 TL"
];

export const EXAMPLE_CALCULATIONS = [
  {
    id: "1",
    title: "Örneğin: 1",
    items: ["Maaş: 45,000 TL", "Hizmet süresi: 8 yıl", "Çözülen: 45.000 × 8"],
    result: "Kıdem Tazminatı = 360,000 TL",
    countValue: "360,000"
  },
  {
    id: "2",
    title: "Örneğin: 2",
    items: [
      "Hisse: 85,000 TL",
      "Hizmet süresi: 8 yıl",
      "Maaş, 2026 yılı kıdem tazminatı tavanını aştığı için tavan uygulanır.",
      "64.948,77 × 8"
    ],
    result: "Tazminat = 519.590.16 TL",
    countValue: "519.590.16"
  }
];

export const ELIGIBILITY_SCENARIOS = [
  {
    id: "termination",
    title: "İşveren Tarafından Sonlandırılan İstihdam",
    intro:
      "Bu, çalışanların İş Kanunu kapsamında kıdem tazminatına hak kazandığı en yaygın durumdur. Çalışanlar genellikle aşağıdaki nedenlerden dolayı kıdem tazminatına hak kazanırlar:",
    list: [
      "Operasyonel nedenlerle bir çalışanın derhal işten çıkarılması.",
      "İş yeri kapanıyor.",
      "Yeniden yapılandırma gerçekleşiyor.",
      "Ekonomik koşullar nedeniyle çalışan işten çıkarılıyor."
    ]
  },
  {
    id: "retirement",
    title: "Emeklilik Davaları",
    intro:
      "Emeklilik durumunda, kıdem tazminatı almaya hak kazanırsınız. Bu genellikle, çalışanın emeklilik yaşına ulaşması ve emekli maaşı almaya hak kazanması durumunda geçerlidir. Çalışan, gerekli sigorta günlerini ve diğer emeklilik koşullarını yerine getirir. Sosyal Güvenlik Kurumu (SGK) emeklilik hakkını onaylar.",
    list: []
  },
  {
    id: "military",
    title: "Askerlik Hizmeti",
    intro:
      "Zorunlu askerlik hizmeti nedeniyle istifa eden erkek çalışanlar genellikle kıdem tazminatına hak kazanırlar. Bu çalışanların kıdem tazminatını alabilmek için askerlik belgelerini ibraz etmeleri gerekmektedir. Kıdem tazminatı miktarı, çalışanın hak kazandığı maaşa ve işten ayrılma tarihindeki geçerli kıdem tavanına göre hesaplanacaktır.",
    list: []
  },
  {
    id: "marriage",
    title: "Marriage Resignation Rights for Female Employees",
    intro:
      "Türk hukukunda evlilik nedeniyle istifa eden kadınların özel hakları bulunmaktadır. Kadın bir çalışan aşağıdaki durumlarda kıdem tazminatı talep edebilir:",
    list: [
      "Evlendikten sonra gönüllü olarak istifa ediyor.",
      "İstifa, evlilik tarihinden itibaren bir yıl içinde gerçekleşiyor.",
      "Minimum hizmet şartını karşılıyor."
    ],
    closing:
      "Bu, kadın haklarını koruyan benzersiz bir yöntemdir. Diğer kıdem tazminatı hesaplamalarında olduğu gibi, geçerli tazminat tavan ücreti, yüksek gelirli çalışanlara ödenecek miktarı sınırlayabilir."
  }
];

export const EMPLOYER_MISTAKES_ROWS = [
  { mistake: "Kıdem tazminatı tavanını göz ardı etmek", consequence: "Fazla ödeme veya eksik ödeme" },
  { mistake: "Brüt maaş yerine net maaş kullanılması", consequence: "Yanlış hesaplama" },
  { mistake: "Brüt maaştan düzenli yan haklar hariç", consequence: "Azaltılmış hak" },
  { mistake: "Eski moda tavan rakamlarını uygulamak", consequence: "Yasal anlaşmazlıklar" },
  { mistake: "Vergi uygulamasının yanlış anlaşılması", consequence: "Uyumluluk riskleri" }
];

export const TAVAN_FAQ_ITEMS = [
  {
    id: "s1",
    question: "S1: Kıdem tazminatı için 'tavan' ne anlama geliyor?",
    answer:
      "Ocak-Haziran 2026 dönemi için kıdem tazminatı tavanı, hizmet yılı başına 64.948,77 TL'dir. Çalışanın aylık brüt maaşı bu tutardan yüksekse, kıdem tazminatı genellikle tavan rakamı üzerinden hesaplanacaktır."
  },
  {
    id: "s2",
    question: "S2: Kıdem tazminatı tavanı ne zaman güncelleniyor?",
    answer: "Kıdem tazminatı tavanı yılda iki kez, genellikle ocak ve temmuz aylarında güncellenir."
  },
  {
    id: "s3",
    question: "S3: Kıdem tazminatı tavanı brüt maaştan nasıl hesaplanır?",
    answer: "Brüt maaşınız daha yüksekse, hesaplama gerçek maaşınız yerine tavan tutar üzerinden yapılacaktır."
  },
  {
    id: "s4",
    question: "S4: Tavan tutarı aşan tazminat için vergi ödemem gerekiyor mu?",
    answer: "Evet, eğer maaşınız tavan tutarının üzerine çıkarsa, bu tutar vergilendirilebilir geliriniz olur."
  },
  {
    id: "s5",
    question: "S5: Tavan tutarını belirleyen kanun nedir?",
    answer:
      "Tazminat tavanı, 5434 sayılı Kanun esas alınarak belirlenir. Bu kanun, kamu görevlilerinin emeklilik haklarını düzenleyen yasal temeldir."
  },
  {
    id: "s6",
    question: "S6: 2025 yılında tavan tutar neydi?",
    answer: "Ocak-Haziran 2025 dönemi için kıdem tazminatı tavan tutarı 41.828,42'dir."
  },
  {
    id: "s7",
    question: "S7: Bir işveren tavan tutarını aşan bir ödeme yapabilir mi?",
    answer:
      "Evet. İşverenler isterlerse yasal olarak belirlenen kıdem tazminatı tavanının üzerinde gönüllü olarak tazminat ödeyebilirler."
  },
  {
    id: "s8",
    question: "S8: Tavan değişikliği uygulandı mı?",
    answer: "Hayır. Çoğu durumda, yeni kıdem tazminatı tavanı geriye dönük olarak uygulanmaz."
  },
  {
    id: "s9",
    question: "S9: Tavan tutarı her sektörde farklı mı?",
    answer: "Hayır. Kıdem tavanı miktarı yasal bir sınırdır ve Türkiye'deki her sektörde aynıdır."
  },
  {
    id: "s10",
    question: "S10: Asgari ücret tavan ücreti etkiler mi?",
    answer:
      "Hayır. Tazminat tavan ücreti asgari ücretle doğrudan bağlantılı değildir. Bunun yerine, öncelikli olarak memur maaş katsayılarına bağlıdır."
  }
];
