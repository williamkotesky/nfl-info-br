import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import NewsCard from "../layout/NewsCard";
import styles from "./Home.module.css";
import ButtonLink from "../layout/ButtonLink";
import BigNewsCard from "../layout/BigNewsCard";
import Content from "../data/Content";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const [news, setNews] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageNews")
    );
    if (localStorageRecover !== null) {
      setNews(Content.news.concat(localStorageRecover.news));
      setShowLoading(true);
      return;
    }

    setNews(Content.news);
    setShowLoading(true);
  }, []);

  return (
    <section className={styles.Homecontainer}>
      <div className={styles.title}>
        <h1>NFL INFO BR</h1>
        <h5>Site com informações dos seus times favoritos da liga</h5>
      </div>

      <div className={styles.newsContainer}>
        {news
          .slice(0)
          .reverse()
          .map(
            (item, index) =>
              index === 0 && (
                <div className={styles.bigNews} key={item.id}>
                  <BigNewsCard
                    id={item.id}
                    title={item.title}
                    img={item.img}
                    alt={item.alt}
                    key={item.id}
                  />
                  <p>Para acessar a lista de news do site, </p>
                  <span className={styles.linkList}>
                    <Link to="/newslist" className={styles.linkListRouter}>
                      clique aqui.
                    </Link>
                  </span>
                </div>
              )
          )}

        <div className={styles.smallNewsGrid}>
          {news
            .slice(0)
            .reverse()
            .map(
              (item, index) =>
                index < 5 &&
                index !== 0 && (
                  <div className={styles.smallNews} key={item.id}>
                    <NewsCard
                      id={item.id}
                      title={item.title}
                      img={item.img}
                      alt={item.alt}
                      key={item.id}
                    />
                  </div>
                )
            )}
        </div>
      </div>

      {!showLoading && (
        <div className={styles.loaderPlace}>
          <Loading />
        </div>
      )}
      {showLoading && news.length === 0 && (
        <div className={styles.zeroNews}>
          <p>Site sem news. Escreva uma news clicando no botão abaixo:</p>
          <ButtonLink to="/writenews" text="Escrever News" />
        </div>
      )}
    </section>
  );
}

export default Home;
