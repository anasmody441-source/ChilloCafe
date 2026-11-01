/**
 * All editable business details live here. The values below are placeholders:
 * replace them with the café's real information before publishing.
 * A contact `href` or social `url` left as null renders as plain text instead of a link.
 */
export const site = {
  brandName: 'ChilloCafé',
  tagline: 'مزاجك يبدأ من أول رشفة',
  description: 'قهوة مختارة بعناية، ومشروبات منعشة، وحلويات تكمل أجمل لحظات يومك في مكان يشبهك.',
  contact: {
    address: 'عنوان تجريبي — يُستبدل بعنوان المقهى',
    phone: { display: '+936988295006', href: null as string | null },
    email: { display: 'ofuqxlove101@gmail.com', href: null as string | null },
  },
  openingHours: [
    { days: 'السبت – الخميس', hours: '8:00 ص – 11:00 م' },
    { days: 'الجمعة', hours: '2:00 م – 11:00 م' },
  ],
  social: [
    { name: 'إنستغرام', url: null as string | null },
    { name: 'فيسبوك', url: null as string | null },
    { name: 'إكس', url: null as string | null },
  ],
  footer: {
    copyright: '© 2026 ChilloCafé — جميع الحقوق محفوظة',
    developerCredit: 'تم التطوير بواسطة المهندس أنس محمد موضي',
  },
};
