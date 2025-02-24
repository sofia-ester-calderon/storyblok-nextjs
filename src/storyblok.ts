import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { Article } from "./components/Article";
import { Page } from "./components/Page";
import { Hero } from "./components/Hero";
import { Grid } from "./components/Grid";
import { Feature } from "./components/Card";
import { Testimonial } from "./components/Testimonial";
import { RecommendedArticles } from "./components/RecommendedArticles";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    article: Article,
    page: Page,
    hero: Hero,
    grid: Grid,
    card: Feature,
    testimonial: Testimonial,
    recommended_articles: RecommendedArticles,
  },
  enableFallbackComponent: true,
});
