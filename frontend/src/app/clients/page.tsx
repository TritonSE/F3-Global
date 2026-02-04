import React from "react";

import ClientsStory from "@/components/clients-page/ClientsStory";
import ClientsStoryExpanded from "@/components/clients-page/ClientsStoryExpanded";
import ClientStoryOverall from "@/components/clients-page/ClientsStoryOverall";

export default function About() {
  return (
    <>
      <ClientStoryOverall
        image="/imgs/clients/rule_breaker.png"
        title="Rule Breaker Snacks"
        description=" is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid. Every bite is certified gluten-free, vegan, and made without nuts, dairy, eggs, or soy, making them a school-safe option for families and anyone with dietary needs. Their product catalog contains full-size Brownies and Blondies, snackable Bites, and kid-friendly junior bites, plus seasonal flavors that keep the brand fresh and dynamic...."
        expandedDescription={[
          {
            paragraph: 0,
            text: "Rule Breaker Snacks",
          },
          {
            paragraph: 1,
            text: " is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid. Every bite is certified gluten-free, vegan, and made without nuts, dairy, eggs, or soy, making them a school-safe option for families and anyone with dietary needs. Their product catalog contains full-size Brownies and Blondies, snackable Bites, and kid-friendly junior bites, plus seasonal flavors that keep the brand fresh and dynamic....",
          },
          {
            paragraph: 2,
            text: "Behind the scenes, Rule Breaker is operated passionately on the foundation that there is a desert snack for everyone, while the brand keeps strong creative control over recipes and quality. You’ll find them online and in thousands of grocery doors nationwide, giving proof that better-for-you can also be great in taste. ",
          },
          {
            paragraph: 3,
            text: "We’re proud to feature Rule Breaker Snacks for their simple ingredient decks, inclusive approach to snacking, and a product experience that strives for great taste, because the best rule to break is the one that says you have to choose between better and delicious.",
          },
        ]}
      />
    </>
  );
}
