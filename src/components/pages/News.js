import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../layout/Loading";
import ButtonLink from "../layout/ButtonLink";
import NewsForm from "../news/NewsForm";
import Content from "../data/Content";
//import { useNavigate } from "react-router-dom";
import styles from "./News.module.css";

function News() {
  const { id } = useParams();
  //const history = useNavigate();

  const [news, setNews] = useState([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showNewsErrorEdit, setShowNewsErrorEdit] = useState(false);
  const [showNewsErrorDelete, setShowNewsErrorDelete] = useState(false);

  useEffect(() => {
    const clickedNews = Content.news.find((item) => item.id === Number(id));
    setNews(clickedNews);
  }, [id]);

  function toggleNewsForm() {
    setShowNewsForm(!showNewsForm);
  }

  function editPost(news) {
    if (news.id <= 4) {
      setShowNewsErrorEdit(true);
      return;
    }
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

  function deletePost() {
    if (news.id <= 4) {
      setShowNewsErrorDelete(true);
      return;
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
                <button onClick={deletePost} className={styles.buttonAction}>
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
