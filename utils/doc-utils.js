export function getDocumentsByCategory(docs, category) {
  return docs.filter((doc) => doc.category === category);
}

export function getDocumentsByAuthor(docs, author) {
  return docs.filter((doc) => doc.author === author);
}
export function getDocumentsByTag(docs, tag) {
  return docs.filter((doc) => doc.tags && doc.tags.includes(tag));
}
