// import React from 'react'
import { useEffect, useState } from "react";
import { useLazyGetSummaryQuery } from "../store/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles,setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromLocalStorage) {
    setAllArticles(articlesFromLocalStorage);
    }
    }, [])
  

  const handleSubmit  = async (e) => {
    e.preventDefault();
     const {data} = await getSummary({articleUrl:article.url});

    if(data?.summary){
      const newArticle = {...article,summary:data.summary};

      const updatedAllArticles = [newArticle,...allArticles];
      setAllArticles(updatedAllArticles); 
      setArticle(newArticle);
      localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
      console.log(newArticle);
      console.log(allArticles)
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              width: "45%",
              marginLeft: "40%",
              marginTop: "20px",
            }}
          >
            <input
              type="url"
              placeholder="paste the article link"
              value={article.url}
              onChange={(e) => {
                setArticle({ ...article, url: e.target.value });
              }}
              required
              style={{
                width: "40%",
                padding: "5px",
                height: "2rem",
                justifyContent: "center",
              }}
            />
            <button
              type="submit"
              style={{
                width: "50px",
                marginLeft: "1rem",
                padding: "10px",
                height: "3rem",
                justifyItems: "center",
              }}
            >
              ✅
            </button>
          </div>
        </form>

        <div>
          {allArticles.map((item,index)=>(
            <div 
            key={`link-${index}`}
            onClick={()=>setArticle(item)}
            >
              <p>{index} - {item.url}</p>
            </div>
          ))}
        </div>

              </div>
            {/* display section */}

            <div>
              {isFetching?(
                <p>Loading</p>
              ):error?(
                <p>That was not supposed to happen</p>
              ):(
                <>
                <hr />
                <h2>Summary</h2>
                <hr />
                <div>{article.summary}</div>
                <hr />
                </>
              )}
            </div>

    </section>
  );
};

export default Demo;
