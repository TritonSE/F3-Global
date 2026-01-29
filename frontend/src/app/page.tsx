import { Highlights } from "@/components/Highlights";

export default function Home() {
  return (
    <div>
      <Highlights
        highlights={[
          {
            id: "1",
            imageUrl: "/highlights/highlight-1.png",
            quote: "...there is a desert snack for everyone...",
            previewText:
              "Rule Breaker Snacks is challenging what normal desserts are considered...",
            fullText:
              "Rule Breaker Snacks is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid.",
            fullTextParagraphs: [
              {
                text: "Rule Breaker Snacks is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid. Every bite is certified gluten-free, vegan, and made without nuts, dairy, eggs, or soy, making them a school-safe option for families and anyone with dietary needs. Their product catalog contains full-size Brownies and Blondies, snackable Bites, and kid-friendly junior bites, plus seasonal flavors that keep the brand fresh and dynamic....",
                boldSegments: [{ start: 0, end: 19 }], // "Rule Breaker Snacks"
              },
              {
                text: "Behind the scenes, Rule Breaker is operated passionately on the foundation that there is a desert snack for everyone, while the brand keeps strong creative control over recipes and quality. You'll find them online and in thousands of grocery doors nationwide, giving proof that better-for-you can also be great in taste.",
                boldSegments: [{ start: 88, end: 127 }], // "there is a desert snack for everyone"
              },
              {
                text: "We're proud to feature Rule Breaker Snacks for their simple ingredient decks, inclusive approach to snacking, and a product experience that strives for great taste, because the best rule to break is the one that says you have to choose between better and delicious.",
              },
            ],
          },
          {
            id: "2",
            imageUrl: "/highlights/highlight-2.png",
            quote: "...lorem ipsum dolor sit amet, consectetur.",
            previewText:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
            fullText:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
          {
            id: "3",
            imageUrl: "/highlights/highlight-3.png",
            quote: "...lorem ipsum dolor sit amet, consectetur.",
            previewText:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
            fullText:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ]}
      />
    </div>
  );
}
