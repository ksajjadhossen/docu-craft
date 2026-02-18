"use client"; // ১. এই লাইনটি অবশ্যই যোগ করতে হবে

import {
  getDocumentsByAuthor,
  getDocumentsByCategory,
  getDocumentsByTag,
} from "@/utils/doc-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = ({ docs }) => {
  const pathname = usePathname(); // ২. হুকটি এখানে কল করুন
  const [filteredDocs, setFilteredDocs] = useState(docs);
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodesGrouped, setNonRootNodesGrouped] = useState({});

  useEffect(() => {
    let matchDocs = docs;

    // ৩. 'pathname' ভ্যারিয়েবলটি ব্যবহার করুন
    if (pathname.includes("/tags")) {
      const tag = pathname.split("/")[2];
      matchDocs = getDocumentsByTag(docs, tag);
      // এখানে ফিল্টার লজিক লিখতে পারেন
    } else if (pathname.includes("/author")) {
      const author = pathname.split("/")[2];
      matchDocs = getDocumentsByAuthor(docs, author);
    } else if (pathname.includes("/categories/")) {
      const category = pathname.split("/")[2];
      matchDocs = getDocumentsByCategory(docs, category);
    }

    const roots = matchDocs.filter((doc) => !doc.parent);

    // Object.groupBy এর জন্য একটি ছোট চেক (পুরানো ব্রাউজারে এরর এড়াতে)
    const nonRoots = matchDocs
      .filter((doc) => doc.parent)
      .reduce((acc, doc) => {
        const parent = doc.parent;
        if (!acc[parent]) acc[parent] = [];
        acc[parent].push(doc);
        return acc;
      }, {});

    const nonRootKeys = Reflect.ownKeys(nonRoots);
    nonRootKeys.forEach((key) => {
      if (!roots.find((root) => root.id === key)) {
        const foundInRoutes = docs.find((doc) => doc.id === key);
        if (!foundInRoutes) {
          const foundInDocs = docs.find((doc) => doc.id === key);
        }
      }
    });

    roots.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });

    setRootNodes([...roots]);
    setNonRootNodesGrouped({ ...nonRoots });
  }, [pathname, docs]); // pathname পরিবর্তন হলে useEffect আবার চলবে

  return (
    <nav className="lg:block my-10">
      {/* বাকি JSX কোড এখানে থাকবে... */}
      <ul role="list">
        {rootNodes.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            <Link
              href={`/docs/${rootNode.id}`}
              className={`flex justify-between gap-2 py-1 pl-4 pr-3 text-sm transition ${
                pathname === `/docs/${rootNode.id}`
                  ? "text-emerald-500"
                  : "text-zinc-900 dark:text-white"
              }`}
            >
              <span className="truncate">{rootNode.title}</span>
            </Link>

            {nonRootNodesGrouped[rootNode.id] && (
              <ul className="border-l border-zinc-900/10 dark:border-white/5 ml-2">
                {nonRootNodesGrouped[rootNode.id].map((subRoot) => (
                  <li key={subRoot.id}>
                    <Link
                      className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      href={`/docs/${rootNode.id}/${subRoot.id}`}
                    >
                      {subRoot.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
