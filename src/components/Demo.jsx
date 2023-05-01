// import React from 'react'
import { useState } from "react";
import { useLazyGetSummaryQuery } from "../store/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit  = async (e) => {
    e.preventDefault();
     const {data} = await getSummary({articleUrl:article.url});

    if(data?.summary){
      const newArticle = {...article,summary:data.summary};
      setArticle(newArticle);

      console.log(newArticle);
    }



    //  setArticle({...article,summary:data.summary})
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="paste the article link"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
          />
          <button type="submit">✅</button>
        </form>
      </div>
    </section>
  );
};

export default Demo;
