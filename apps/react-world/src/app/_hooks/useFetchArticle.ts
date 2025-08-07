import { useEffect, useState } from "react";
import { objToQueryStr, safeAwait } from "../../shared/utils";

interface Author {
  bio: string;
  image: string;
  username: string;
  following: boolean;
}
interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}
interface ArticleResponse {
  articles: Article[];
  articlesCount: number;
}

interface ArticleParams {
  tag?: string;
  author?: string;
  favorited?: string;
  limit: number;
  offset: number;
}

const fetchAritcle = async (
  articleParams: ArticleParams,
): Promise<ArticleResponse> => {
  return await fetch(
    `https://api.realworld.build/api/articles?${objToQueryStr(articleParams)}`,
  ).then((res) => res.json());
};

const useFetchArticle = () => {
  const [article, setArticle] = useState<
    [ArticleResponse | null, Error | null]
  >([null, null]);
  const [articleParams, setArticleParams] = useState<ArticleParams>({
    limit: 20,
    offset: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    safeAwait(fetchAritcle(articleParams))
      .then((res) => {
        setArticle(res);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [articleParams]);

  return {
    article,
    loading: !article[0] && loading,
    articleParams,
    setArticleParams,
  };
};

export default useFetchArticle;
