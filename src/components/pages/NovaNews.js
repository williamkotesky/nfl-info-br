// import styles from './NovaNews.module.css';
import NewsForm from "../news/NewsForm";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function NovaNews() {
  const history = useNavigate();

  function createPost(news) {
    if (!localStorage.getItem("localStorageNews")) {
      const localStorageNews = { news: [] };
      localStorage.setItem(
        "localStorageNews",
        JSON.stringify(localStorageNews)
      );
    }

    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageNews")
    );

    // function newsId() {
    //   if (
    //     localStorageRecover &&
    //     Object.keys(localStorageRecover).length === 0
    //   ) {
    //     return 5;
    //   }
    //   return 5 + Object.keys(localStorageRecover.news).length; //ALTERAR?????????????
    // }

    const newsIdValue = uuidv4();
    const idNumber = parseInt(newsIdValue.replace(/-/g, ""), 16);
    news = { ...news, id: idNumber };
    localStorageRecover && localStorageRecover.news.push(news);

    localStorage.setItem(
      "localStorageNews",
      JSON.stringify(localStorageRecover)
    );
    history("/");

    // fetch('http://localhost:5000/news', {
    //     method: 'POST',
    //     headers: {
    //         "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(news)
    // }).then((resp) => resp.json())
    // .then((data) => {
    //     history('/', {state: { message: 'News postada com sucesso' }})

    // })
    // .catch((err) => console.log(err));
  }

  return (
    <section>
      <NewsForm handleSubmit={createPost} btnText="Publicar News" />
    </section>
  );
}

export default NovaNews;
