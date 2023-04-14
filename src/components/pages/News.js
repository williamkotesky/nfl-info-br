import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../layout/Loading";
import ButtonLink from "../layout/ButtonLink";
import NewsForm from "../news/NewsForm";
import Content from "../data/Content";
import styles from "./News.module.css";

function News() {
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showNewsErrorEdit, setShowNewsErrorEdit] = useState(false);
  const [showNewsErrorDelete, setShowNewsErrorDelete] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageNews")
    );
    let clickedNews;
    if (localStorageRecover !== null) {
      const teamConcat = Content.news.concat(localStorageRecover.news);
      clickedNews = teamConcat.find((item) => item.id === Number(id));
      setNews(clickedNews);
      return;
    }
    clickedNews = Content.news.find((item) => item.id === Number(id));
    setNews(clickedNews);
  }, [id]);

  function toggleNewsForm() {
    setShowNewsForm(!showNewsForm);
  }

  function editPost(newsUpdated) {
    if (newsUpdated.id <= 4 && newsUpdated.id % 1 === 0) {
      setShowNewsErrorEdit(true);
      return;
    }

    const localStorageRecover = JSON.parse(
      localStorage.getItem(`localStorageNews`)
    );

    const newsArray = localStorageRecover.news;
    let upDatedData = newsArray.map((item) => {
      if (item.id === news.id) {
        return newsUpdated;
      }
      return item;
    });

    localStorageRecover.news = upDatedData;
    localStorage.setItem(
      "localStorageNews",
      JSON.stringify(localStorageRecover)
    );
    back();
    window.location.reload();
    window.scrollTo(0, 0);
    // fetch(`http://localhost:5000/news/${news.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(news),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setNews(data);
    //     setShowNewsForm(false);
    //   })
    //   .catch((err) => console.log(err));
  }

  function back() {
    setShowNewsForm(!showNewsForm);
  }

  function deletePost(id) {
    if (news.id <= 4 && news.id % 1 === 0) {
      setShowNewsErrorDelete(true);
      return;
    }

    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageNews")
    );
    const newsArray = localStorageRecover.news;

    const newNewsArray = newsArray.filter((item) => item.id !== Number(id));
    //map((item) => console.log(item.id, id));
    console.log(newNewsArray);
    localStorageRecover.news = newNewsArray;
    localStorage.setItem(
      "localStorageNews",
      JSON.stringify(localStorageRecover)
    );
    history("/");

    //     fetch(`http://localhost:5000/news/${id}`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((resp) => resp.json())
    //       .then(() => {
    //         history("/");
    //       })
    //       .catch((err) => console.log(err));
  }

  return (
    <>
      {news.title ? (
        <article className={styles.newsSection}>
          {!showNewsForm ? (
            <div className={styles.newsContainer}>
              <h2>{news.title}</h2>

              <div className={styles.imgContainer}>
                <img src={news.img} alt={news.alt} />
              </div>

              <div className={styles.newsHead}>
                <h5>Por: {news.autor}</h5>
                <hr />
                <h5>{news.date}</h5>
              </div>

              <div className={styles.newsButtons}>
                <button
                  onClick={toggleNewsForm}
                  className={styles.buttonAction}
                >
                  Editar
                </button>
                <button
                  onClick={() => deletePost(id)}
                  className={styles.buttonAction}
                >
                  Deletar
                </button>
                <ButtonLink to="/" text="Voltar" />
              </div>

              {showNewsErrorDelete && (
                <div className={styles.showNewsErrorClass}>
                  <p>Você não pode deletar informações preexistentes</p>
                </div>
              )}

              <div className={styles.newsBody}>
                <p>{news.newsBody}</p>
              </div>
            </div>
          ) : (
            <div className={styles.editContainer}>
              <NewsForm
                handleSubmit={editPost}
                btnText="Concluir edição"
                newsData={news}
                newsError={showNewsErrorEdit}
              />

              <button className={styles.buttonBack} onClick={back}>
                Voltar
              </button>
            </div>
          )}
        </article>
      ) : (
        <div className={styles.loaderPlace}>
          <Loading />
        </div>
      )}
    </>
  );
}

export default News;
