export type Category = "Skincare" | "Makeup" | "Fragrance";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  image: string;
  badge?: string;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "rose-glow-serum",
    name: "Rose Glow Serum",
    category: "Skincare",
    price: 45,
    rating: 4.9,
    reviewCount: 248,
    description: "Radiance-boosting face serum with pure rose extract",
    longDescription:
      "Our bestselling Rose Glow Serum is infused with concentrated Bulgarian rose extract, hyaluronic acid, and vitamin E to deliver intense hydration and a luminous, glass-skin effect. The lightweight, fast-absorbing formula works at a cellular level to visibly reduce fine lines, brighten uneven skin tone, and restore your skin's natural radiance within just 2 weeks of daily use.",
    image: "/assets/generated/product-rose-serum.dim_500x500.jpg",
    badge: "Best Seller",
    isBestseller: true,
  },
  {
    id: "hydra-boost-moisturizer",
    name: "Hydra Boost Moisturizer",
    category: "Skincare",
    price: 38,
    rating: 4.7,
    reviewCount: 182,
    description: "Deep hydration moisturizer with ceramide complex",
    longDescription:
      "Experience 72-hour hydration with our advanced Hydra Boost Moisturizer. Formulated with a triple ceramide complex, shea butter, and a blend of botanical extracts, this rich yet non-greasy cream creates a protective moisture barrier, plumps the skin, and leaves a velvety-soft finish. Suitable for all skin types, including sensitive skin.",
    image: "/assets/generated/product-moisturizer.dim_500x500.jpg",
    isBestseller: true,
  },
  {
    id: "vitamin-c-toner",
    name: "Vitamin C Brightening Toner",
    category: "Skincare",
    price: 29,
    rating: 4.6,
    reviewCount: 156,
    description: "Brightening toner with stable Vitamin C & niacinamide",
    longDescription:
      "Our Vitamin C Brightening Toner is packed with stabilized ascorbic acid (Vitamin C), niacinamide, and ferulic acid to visibly fade dark spots, even skin tone, and boost your skin's natural glow. This water-light formula preps skin to better absorb serums and moisturizers that follow, making it an essential step in your brightening routine.",
    image: "/assets/generated/product-toner.dim_500x500.jpg",
    badge: "New",
  },
  {
    id: "golden-eye-cream",
    name: "Golden Eye Cream",
    category: "Skincare",
    price: 52,
    rating: 4.8,
    reviewCount: 203,
    description: "Anti-aging eye cream with 24k gold peptides",
    longDescription:
      "The Golden Eye Cream combines 24k gold nano-particles with peptide complex and caffeine to target the delicate under-eye area. This luxurious formula works to visibly diminish dark circles, puffiness, and fine lines while providing intense, long-lasting moisture. The lightweight texture absorbs instantly without migrating into the eyes.",
    image: "/assets/generated/product-eye-cream.dim_500x500.jpg",
    isBestseller: true,
  },
  {
    id: "velvet-matte-lipstick",
    name: "Velvet Matte Lipstick",
    category: "Makeup",
    price: 22,
    rating: 4.8,
    reviewCount: 312,
    description: "Long-wearing matte lip color in 18 rich shades",
    longDescription:
      "Our Velvet Matte Lipstick delivers rich, opaque color in a single swipe with a comfortable, non-drying matte finish that lasts up to 12 hours. Infused with vitamin E and jojoba oil to keep lips moisturized throughout the day. Available in 18 carefully curated shades from nude pinks to deep berries and classic reds.",
    image: "/assets/generated/product-lipstick.dim_500x500.jpg",
    badge: "Best Seller",
    isBestseller: true,
  },
  {
    id: "glow-highlighter-palette",
    name: "Glow Highlighter Palette",
    category: "Makeup",
    price: 48,
    rating: 4.9,
    reviewCount: 274,
    description: "5-shade illuminating palette for sculpted radiance",
    longDescription:
      "The Glow Highlighter Palette features five universally flattering shades ranging from champagne to bronze, each with a finely milled, ultra-blendable formula that catches light for a natural-lit-from-within glow. The buildable formula works on all skin tones and can be used wet for an intense metallic effect or dry for a subtle luminosity.",
    image: "/assets/generated/product-highlighter.dim_500x500.jpg",
    badge: "New",
  },
  {
    id: "silk-foundation",
    name: "Silk Foundation",
    category: "Makeup",
    price: 55,
    rating: 4.7,
    reviewCount: 189,
    description: "Skin-perfecting buildable coverage foundation",
    longDescription:
      "The Silk Foundation blends seamlessly into skin for a natural, second-skin finish with buildable coverage from light to medium. Enriched with hyaluronic acid and silk proteins, it hydrates and smooths the complexion while providing SPF 20 sun protection. Available in 30 shades with undertone-specific formulas for a perfect match.",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
  },
  {
    id: "brow-sculpt-pencil",
    name: "Brow Sculpt Pencil",
    category: "Makeup",
    price: 18,
    rating: 4.6,
    reviewCount: 145,
    description: "Ultra-fine precision brow definer with spoolie",
    longDescription:
      "The Brow Sculpt Pencil features a micro-precision tip for hair-like strokes that mimic the appearance of natural brow hairs. The smudge-proof, sweat-resistant formula with a built-in spoolie brush allows you to define, fill, and groom brows for a polished yet natural look that lasts all day without fading or flaking.",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a36?w=500&q=80",
  },
  {
    id: "bloom-eau-de-parfum",
    name: "Bloom Eau de Parfum",
    category: "Fragrance",
    price: 89,
    rating: 4.9,
    reviewCount: 267,
    description: "Feminine floral with peony, rose & white musk",
    longDescription:
      "Bloom Eau de Parfum opens with a vibrant burst of peony petals and pink pepper, blooming into a heart of lush rose, jasmine, and lily of the valley. The base of white musk, sandalwood, and amber creates a warm, lasting trail. This romantic floral fragrance embodies the essence of a garden in full bloom — fresh, feminine, and utterly captivating.",
    image: "/assets/generated/product-perfume.dim_500x500.jpg",
    badge: "Best Seller",
    isBestseller: true,
  },
  {
    id: "rose-noir-perfume",
    name: "Rose Noir Perfume",
    category: "Fragrance",
    price: 120,
    rating: 4.8,
    reviewCount: 198,
    description: "Mysterious dark floral with rose, oud & vanilla",
    longDescription:
      "Rose Noir is a bold, sophisticated fragrance that balances the classic beauty of Turkish rose with the depth of oud wood, smoky vetiver, and creamy vanilla. An intense, long-lasting scent that evolves beautifully on the skin over hours. Perfect for evenings and special occasions when you want to make a lasting impression.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
    badge: "Luxury",
  },
  {
    id: "citrus-fresh-edt",
    name: "Citrus Fresh EDT",
    category: "Fragrance",
    price: 65,
    rating: 4.6,
    reviewCount: 134,
    description: "Energizing citrus blend with bergamot & cedar",
    longDescription:
      "Citrus Fresh EDT is a vibrant, invigorating fragrance perfect for everyday wear. Opens with zesty bergamot, sun-kissed lemon, and pink grapefruit. The heart reveals fresh mint and jasmine, while a base of cedarwood and light musk provides a clean, sophisticated dry-down. Light yet memorable, it's the perfect daytime companion.",
    image:
      "https://images.unsplash.com/photo-1592945403407-9caf930b4f05?w=500&q=80",
  },
  {
    id: "midnight-oud",
    name: "Midnight Oud",
    category: "Fragrance",
    price: 145,
    rating: 4.9,
    reviewCount: 89,
    description: "Opulent oud, saffron & dark amber signature scent",
    longDescription:
      "Midnight Oud is our most luxurious fragrance — a rich, opulent blend of precious oud wood, saffron, dark rose, and smoky incense resting on a base of labdanum, amber, and musk. Inspired by the mystique of the Orient, this powerful, long-lasting scent leaves an unforgettable trail. A true masterpiece in a bottle for those who demand the extraordinary.",
    image:
      "https://images.unsplash.com/photo-1590156206657-aec9de7c04c6?w=500&q=80",
    badge: "Luxury",
  },
];

export const categories: Category[] = ["Skincare", "Makeup", "Fragrance"];

export const bestsellers = products.filter((p) => p.isBestseller);
