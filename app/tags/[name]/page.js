import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByTag } from "@/utils/doc-utils";

const TagPage = async ({ params }) => {
  // params কে ডিস্ট্রাকচার করার আগে await করে নেওয়া ভালো
  const { name } = await params;
  const doc = getDocuments();
  const matchedDocuments = getDocumentsByTag(doc, name);
  return <ContentDisplay id={matchedDocuments[0].id}></ContentDisplay>;
};

export default TagPage;
