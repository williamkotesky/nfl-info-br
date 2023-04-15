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

    const newsIdValue = uuidv4();
    const idNumber = parseInt(newsIdValue.replace(/-/g, ""), 16);
    news = { ...news, id: idNumber };
    localStorageRecover && localStorageRecover.news.push(news);

    localStorage.setItem(
      "localStorageNews",
      JSON.stringify(localStorageRecover)
    );
    history("/");
  }

  return (
    <section>
      <NewsForm handleSubmit={createPost} btnText="Publicar News" />
    </section>
  );
}

export default NovaNews;
