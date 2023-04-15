import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import ButtonLink from "../layout/ButtonLink";
import { Link } from "react-router-dom";
import Content from "../data/Content";
import styles from "./NewsList.module.css";

function NewsList() {
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
    <section className={styles.newsListContainer}>
      <h2>Lista de news do NFL INFO BR</h2>
      <ul>
        {news
          .slice(0)
          .reverse()
          .map((item) => (
            <li className={styles.listItem} key={item.id}>
              <Link
                to={`/${item.id}/${item.title
                  .replace(/\s/g, "-")
                  .toLowerCase()}`}
              >
                <h4>- {item.title}</h4>
              </Link>
              <p>Por:</p> <span>{item.autor}</span>
              <br />
              <p>Em:</p> <span>{item.date}</span>
            </li>
          ))}
      </ul>

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

export default NewsList;
