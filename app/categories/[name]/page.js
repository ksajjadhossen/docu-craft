import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByCategory } from "@/utils/doc-utils";

const categoriesPage = async ({ params }) => {
  // params কে ডিস্ট্রাকচার করার আগে await করে নেওয়া ভালো
  const { name } = await params;

  const doc = getDocuments();
  const matchedDocuments = getDocumentsByCategory(doc, name);
  return <ContentDisplay id={matchedDocuments[0].id}></ContentDisplay>;
};

export default categoriesPage;
