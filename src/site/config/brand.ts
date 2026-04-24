export const brand = {
  name: "Nuance Studio",
  whatsappNumber: "5511936229510",
  pixelId: "1710893766988755",
  gaId: "G-11WXXV8Q03",
  canonicalUrl: "https://nuance-studio-landing.vercel.app/",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
