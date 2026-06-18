import { getImageMeta } from "@/config/images";

export const IHBAR_IMAGES = {
  hero: {
    src: "/images/ihbar/hero.webp",
    ...getImageMeta("/images/ihbar/hero.webp")
  },
  kidem: {
    src: "/images/ihbar/kidem.webp",
    ...getImageMeta("/images/ihbar/kidem.webp")
  },
  rights: {
    src: "/images/ihbar/rights.webp",
    ...getImageMeta("/images/ihbar/rights.webp")
  }
};

export const NOTICE_TIERS = [
  { duration: "6 aydan az", weeks: "2 hafta" },
  { duration: "6 ay – 1,5 yıl", weeks: "4 hafta" },
  { duration: "1.5 – 3 yıl", weeks: "6 hafta" },
  { duration: "3 yıldan fazla", weeks: "8 hafta" }
];

export const NOTICE_EXCEPTIONS = [
  "Haklı fesih (çalışan tarafından, Madde 24))",
  "İş Kanunu Madde 24 Uyarınca Fesih",
  "İş Kanunu Madde 25 Uyarınca Fesih (İşveren Tarafından Haklı Fesih Nedenleri)",
  "Haklı fesih bildirimini içeren davalar"
];

export const NOTICE_EXAMPLES = [
  {
    title: "Örnek 1: İşveren çalışanın işine son veriyor",
    body: "Bir çalışan bir şirkette beş yıl çalıştıktan sonra işveren sözleşmeyi derhal ve haber vermeden feshederse, çalışan sekiz haftalık maaşına eşit ihbar tazminatına hak kazanır."
  },
  {
    title: "Örnek 2: Çalışanın İstifası",
    body: "İki yıllık hizmet süresi olan bir çalışan, gerekli altı haftalık ihbar süresini tamamlamadan derhal istifa ederse, işveren çalışanın yasal ihbar şartına uymamasından dolayı ihbar tazminatını alacaktır."
  },
  {
    title: "Örnek 3: Haklı Gerekçeyle İşten Çıkarma",
    body: "Eğer bir çalışan, birkaç aydır ücreti ödenmediği için istifa ederse, İş Kanunu'nun 24. maddesi (çalışanın haklı fesih nedenleri) uyarınca, çalışan ihbar süresi vermeden derhal işten ayrılabilir. Bu durumda, genellikle ihbar tazminatı ödenmez."
  }
];

export const COMPARISON_ROWS = [
  {
    feature: "Anlam",
    noticePeriod: "İş sözleşmesinin sona erdirilmesi için verilmesi gereken süre.",
    payment: "Gerekli ihbar süresi verilmediğinde tazminat ödenir."
  },
  {
    feature: "Amaç",
    noticePeriod: "Her iki tarafa da iş ilişkisinin sona ermesine hazırlanmaları için zaman tanır.",
    payment: "Uygun bildirim yapılmamasından kaynaklanan zararı karşılar."
  },
  {
    feature: "Biçim",
    noticePeriod: "Süreye bağlı yükümlülük (hafta).",
    payment: "Parasal tazminat."
  },
  {
    feature: "Hesaplama",
    noticePeriod: "Çalışanın hizmet süresine bağlı olarak.",
    payment: "Çalışanın brüt maaşı, tüm yan hakları ve geçerli ihbar süresi dikkate alınarak hesaplanır."
  },
  {
    feature: "Uygulanabilir Olduğunda",
    noticePeriod: "Fesih yürürlüğe girmeden önce.",
    payment: "Bildirim süresine uyulmadığı takdirde."
  }
];

export const NOT_ELIGIBLE_ITEMS = [
  "İş sözleşmesi karşılıklı anlaşma ile sona erer.",
  "Çalışan, yasal bir ihbar süresi vermeden veya haklı bir sebep göstermeden gönüllü olarak istifa eder.",
  "Çalışanın işine İş Kanunu'nun 25. maddesinde (işveren tarafından haklı fesih nedenleri) belirtilen sebeplerden dolayı son verilmiştir.",
  "İş ilişkisi belirli süreli bir sözleşmeye dayanmaktadır.",
  "Çalışan, bu koşullar altında sözleşmeyi derhal fesheder."
];

export const RIGHTS_CARDS = [
  {
    id: "ucret",
    title: "İhbar Süresi Boyunca Ücret ve Yan Haklar",
    paragraphs: [
      "İşverenlik döneminizin avantajlarından yararlanabilirsiniz. İhbar süresi boyunca da bu avantajlardan faydalanabilirsiniz.",
      "Bu şunları içerir:"
    ],
    list: ["Maaş ödemeleri", "Bonuslar", "Ulaşım ödenekleri"]
  },
  {
    id: "izin",
    title: "İş Arama İzni (İhbar Süresi İçinde)",
    paragraphs: [
      "Bu izin temelde yeni bir iş ararken izin almanız anlamına gelir. İş arama izninin amacı, çalışanların mevcut işleri sona ermeden önce iş görüşmelerine katılmalarına, işverenlerle tanışmalarına ve gelecekteki işlerini güvence altına almalarına olanak sağlamaktır."
    ],
    list: []
  },
  {
    id: "bahce",
    title: "Bahçe İzni",
    paragraphs: [
      "'Bahçe izni', bir çalışanın iş yapmadığı halde maaşını ve iş haklarını almaya devam etmesi anlamına gelir.",
      "Bahçe izni genellikle şu durumlarda kullanılır:"
    ],
    list: [
      "Çalışanların hayati öneme sahip bilgilere erişimi vardır.",
      "İşverenler müşteri ilişkilerini korumak ister.",
      "İşverenler, çalışanların rakiplerle hemen işe alınmasını önlemek ister."
    ]
  }
];

export const PILON_FACTORS = [
  "Temel maaş",
  "Sözleşmeden doğan faydalar",
  "Düzenli ödenekler yardimlar",
  "Bonuslar geçerliydi",
  "Diğer tazminat unsurları normal ücretlendirmeye dahildir."
];

export const PILON_PROS = [
  "İş ilişkisinin derhal feshedilmesi.",
  "Daha hızlı iş gücü yeniden yapılandırması.",
  "İş yerindeki çatışmaların azalması.",
  "Gizli bilgilerin korunması.",
  "Çalışanlar ihbar süresini çalışmadan tazminat alırlar."
];

export const PILON_CONS = [
  "İşverenler için yüksek başlangıç ​​maliyeti.",
  "Tazminat hesaplamaları konusunda potansiyel anlaşmazlıklar."
];

export const IHBAR_FAQ_ITEMS = [
  {
    id: "s1",
    question: "S1: İhbar tazminatı ne anlama gelir? Kimler bu tazminatı alabilir?",
    answer:
      "İhbar tazminatı, yasal bir bildirimde bulunulmadan veya haklı bir sebep gösterilmeden iş sözleşmesinin feshedilmesi durumunda çalışana veya işverene ödenen tazminat miktarıdır. Çalışan, yasal bir bildirimde bulunulmadan işten çıkarılırsa ihbar tazminatı talep edebilir; işveren de çalışanın uygun bir bildirimde bulunmadan derhal işten çıkarılması durumunda bu tazminatı talep edebilir."
  },
  {
    id: "s2",
    question: "S2: Kıdem tazminatı nedir? Kimler alabilir?",
    answer: "İşten ayrılma veya emeklilik sonrasında işverene uzun süre hizmet etme karşılığı ödenen tazminat miktarıdır."
  },
  {
    id: "s3",
    question: "S3: Kıdem tazminatı ile ihbar tazminatı arasındaki fark nedir?",
    answer:
      "İhbar tazminatı, duruma bağlı olarak, yasal kurallara uyan bir çalışana hem işveren hem de çalışan tarafından ödenebilecek tutardır; kıdem tazminatı ise iş ilişkisi sona erdiğinde işveren tarafından çalışana ödenen hizmet bedelidir."
  },
  {
    id: "s4",
    question: "S4: Kendi isteğimle ayrılırsam kıdem tazminatı alabilir miyim?",
    answer:
      "Çoğu durumda hayır. Türk iş hukukuna göre, gönüllü istifa kıdem hakkı doğurmaz. Ancak, emeklilik, askerlik hizmeti, kadın çalışanlar için evlilik ve İş Kanunu'nun 24. maddesi uyarınca haklı fesih (çalışanın haklı fesih nedenleri) gibi önemli istisnalar mevcuttur."
  },
  {
    id: "s5",
    question: "S5: Evlilik nedeniyle işten ayrılan kadın çalışan kıdem tazminatı alabilir mi?",
    answer: "Evet, bir kadın evlilik nedeniyle işten ayrıldıktan sonra bir yıl içinde tazminat alabilir."
  },
  {
    id: "s6",
    question: "S6: Askerlik hizmeti nedeniyle ayrılırsam kıdem tazminatı alabilir miyim?",
    answer:
      "Evet. Zorunlu askerlik hizmeti nedeniyle istifa eden çalışanlar kıdem tazminatına hak kazanabilirler. Askerlik hizmeti nedeniyle ayrılmak, 1475 sayılı Kanun'un 14. maddesi uyarınca bir çalışanın kıdem tazminatına hak kazanmasını sağlayabilecek yasal olarak tanınan nedenlerden biridir."
  },
  {
    id: "s7",
    question: "S7: Emekli olduğumda kıdem tazminatı alabilir miyim?",
    answer:
      "Evet. Emeklilik şartlarını yerine getiren çalışanlar genellikle kıdem tazminatı talep edebilirler. Emeklilik nedeniyle ayrılmak, insanların kıdem tazminatı almasının yaygın koşullarından biridir."
  },
  {
    id: "s8",
    question: "S8: Kıdem tazminatı nasıl hesaplanır? Hangi maaş esas alınır?",
    answer:
      "Çalışanlar sıklıkla 'işten ayrılma tazminatı ne kadar', '1 yıllık işten ayrılma tazminatı miktarı', '2 yıllık tazminat miktarı' ve '10 yıllık işten ayrılma tazminatı miktarı' gibi aramalar yapmaktadır. İşten ayrılma tazminatı genellikle çalışanın tüm yan hakları dahil brüt maaşı üzerinden hesaplanır. Standart formül şöyledir:",
    formula: "30 gün × tam yıl formülü"
  },
  {
    id: "s9",
    question: "S9: İhbar süreleri nelerdir?",
    answer:
      "İş Kanunu'nun 17. Maddesi (ihbar süresi) uyarınca, ihbar süreleri çalışanın hizmet süresine bağlıdır. İhbar süresi, 6 aydan az olanlar için 2 hafta, 6 aydan fazla olanlar için ise 4 haftadır."
  },
  {
    id: "s10",
    question: "S10: Kıdem tazminatımdan vergi kesintisi yapılacak mı?",
    answer: "Toplam tutardan yalnızca 0.759 % oranındaki damga vergisi düşülmektedir."
  },
  {
    id: "s11",
    question: "S11: İşverenim kıdem tazminatımı ödemezse ne yapmalıyım?",
    answer:
      "İşveren kıdem tazminatı ödemeyi reddederse, çalışanlar öncelikle iş ve işten ayrılma kayıtlarını ve maaş bilgilerini toplamalıdır. Daha sonra gerekli çözüm sürecini başlatabilirler."
  },
  {
    id: "s12",
    question: "S12: Arabuluculuk, iş uyuşmazlıklarında rol oynar mı?",
    answer: "Evet. Dava açılmadan önce arabuluculuk başvurusu (zorunlu) yapılması gereken bir adımdır."
  },
  {
    id: "s13",
    question: "S13: Kıdem tazminatı için zamanaşımı süresi ne kadardır?",
    answer: "İş sözleşmesinin feshi için geçerli zamanaşımı süresi genellikle 5 yıl kuralıyla belirlenir."
  },
  {
    id: "s14",
    question: "S14: Seyahat ve yemek ödenekleri brüt maaşa dahil mi?",
    answer: "Evet, bunlar tüm yan haklarla birlikte brüt maaşa dahildir."
  },
  {
    id: "s15",
    question: "S15: Yıllık izin ücretimi nasıl alabilirim?",
    answer:
      "Ödeme genellikle çalışanın işten ayrılma tarihindeki maaşına göre hesaplanır ve diğer iş alacaklarıyla birlikte ödenmelidir."
  }
];
