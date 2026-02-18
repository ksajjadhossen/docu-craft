import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByAuthor } from "@/utils/doc-utils";

const AuthorPage = async ({ params }) => {
  const { name } = await params;
  const doc = getDocuments();
  const matchedDocuments = getDocumentsByAuthor(doc, name);
  return <ContentDisplay id={matchedDocuments[0].id}></ContentDisplay>;
};

export default AuthorPage;
