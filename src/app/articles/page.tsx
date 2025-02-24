import { StoryblokStory } from "@storyblok/react/rsc";
import { RecommendedArticle } from "@/components/RecommendedArticle";
import { draftMode } from "next/headers";
import { getStoryblokApi } from "@/storyblok";

const fetchArticlesPage = async () => {
  const { isEnabled } = await draftMode();
  const client = getStoryblokApi();
  const response = await client.getStory(`lrs-website/articles/`, {
    version:
      process.env.NODE_ENV === "development" || isEnabled
        ? "draft"
        : "published",
  });
  return response.data.story;
};

const fetchAllArticles = async () => {
  const { isEnabled } = await draftMode();
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "article",
    version:
      process.env.NODE_ENV === "development" || isEnabled
        ? "draft"
        : "published",
  });
  return response.data.stories;
};

const ArticlesPage = async () => {
  const story = await fetchArticlesPage();
  const articles = await fetchAllArticles();

  return (
    <div>
      <StoryblokStory story={story} />
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-4 w-full py-16">
        {articles.map((article) => (
          <RecommendedArticle story={article} key={article.content._uid} />
        ))}
      </div>
    </div>
  );
};
export default ArticlesPage;
