"use client";

import { Fragment, useEffect, useState } from "react";
import { formatDate, getKeysOfObject, safeAwait } from "../../shared/utils";
import Image from "next/image";
import useFetchArticle from "../_hooks/useFetchArticle";

const fetchTags = async (): Promise<{ tags: string[] }> => {
  return await fetch("https://api.realworld.build/api/tags").then((res) =>
    res.json(),
  );
};

const useFetchFeed = () => {
  const [tags, setTags] = useState<[{ tags: string[] } | null, Error | null]>([
    null,
    null,
  ] as const);

  useEffect(() => {
    safeAwait(fetchTags()).then((res) => {
      setTags(res);
    });
  }, []);

  return { tags };
};

export default function Feed() {
  const { article, loading, articleParams, setArticleParams } =
    useFetchArticle();
  const { tags } = useFetchFeed();

  const [tagsData] = tags;
  const [articleData, articleError] = article;

  if (articleError) return <div>❌ 에러: {articleError.message}</div>;
  if (loading) return <div>📦 피드 로딩 중...</div>;

  const isGlobalFeed = getKeysOfObject(articleParams).length === 2;

  return (
    <div>
      <div className="flex gap-4 items-center p-4">
        <button onClick={() => alert("로그인")}>Your Feed</button>
        <button
          onClick={() => setArticleParams({ limit: 20, offset: 0 })}
          className={`${isGlobalFeed ? "text-main-green" : ""}`}
        >
          Global Feed
        </button>
        <button
          className={`${!loading && articleParams.tag ? "text-main-green" : "invisible"}`}
        >
          #{articleParams.tag}
        </button>
      </div>
      <div>
        {articleData?.articles.map((article) => {
          return (
            <Fragment key={article.title}>
              <div className="flex justify-between border-t-1 border-main-gray">
                <div className="flex">
                  <Image
                    className="h-8 rounded-full"
                    src={article.author.image}
                    width={32}
                    height={32}
                    alt=""
                  />
                  <div>
                    <div>{article.author.username}</div>
                    <div>{formatDate(article.createdAt)}</div>
                  </div>
                </div>
                <div className="py-1 px-2 border-solid border-1 h-fit text-main-green border-main-green">
                  {article.favoritesCount}
                </div>
              </div>
              <div className="font-bold ">{article.title}</div>
              <div className="text-main-gray">{article.description}</div>
              <div className="text-main-gray text-xs flex justify-between">
                <div>Read More..</div>
                <div className="inline-flex gap-2 max-w-[50%] flex-wrap">
                  {article.tagList.map((tag) => (
                    <span
                      key={tag}
                      className="border-1 rounded-full p-2
 border-main-gray"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="bg-[#f3f3f3]">
        <div>Popular Tags</div>
        <ul className="flex flex-wrap">
          {tagsData?.tags?.map((tag) => (
            <li
              key={tag}
              className="text-white bg-main-gray w-fit rounded-full p-1.5 text-xs"
              onClick={() => setArticleParams((prev) => ({ ...prev, tag }))}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
