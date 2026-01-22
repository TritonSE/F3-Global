import { Highlights } from "@/components/Highlights";

const sampleHighlights = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    quote: "...lorem ipsum dolor sit amet, consectetur.",
    previewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    quote: "...there is a desert snack for everyone...",
    previewText: "Rule Breaker Snacks is challenging what normal desserts are considered...",
    fullText:
      "Rule Breaker Snacks is challenging what normal desserts are considered and creating delicious, allergen-friendly treats that everyone can enjoy. Their commitment to inclusivity and taste has revolutionized the snack industry, proving that dietary restrictions don't mean compromising on flavor or quality. Every bite is crafted with care and passion.",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    quote: "Lorem ipsum dolor sit amet...",
    previewText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. The team's dedication to excellence and innovation has set new standards in the industry, inspiring others to follow their lead.",
  },
];

export default function Home() {
  return (
    <div>
      <Highlights highlights={sampleHighlights} />
    </div>
  );
}
