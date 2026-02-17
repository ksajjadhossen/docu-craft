import ContentDisplay from "@/components/ContentDisplay";

const ContentPage = async ({ params }) => {
  const { contentId } = await params;
  return <ContentDisplay id={contentId}></ContentDisplay>;
};

export default ContentPage;
