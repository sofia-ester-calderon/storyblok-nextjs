import { getStoryblokApi } from "@/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

const fetchHomePage = async () => {
  const { isEnabled } = await draftMode();
  const client = getStoryblokApi();
  const response = await client.getStory(`lrs-website/home`, {
    version:
      process.env.NODE_ENV === "development" || isEnabled
        ? "draft"
        : "published",
    resolve_relations: "recommended_articles.articles",
  });
  console.log(response)
  return response.data.story;
};

const HomePage = async () => {
  const story = await fetchHomePage();
  return (
    <StoryblokStory
      bridgeOptions={{ resolveRelations: ["recommended_articles.articles"] }}
      story={story}
    />
  );
};

export default HomePage;
