import styles from "./NewsForm.module.css";
import { useState } from "react";
import Input from "../Form/Input";
import TextArea from "../Form/TextArea";
import SubmitButton from "../Form/SubmitButton";
import ButtonLink from "../layout/ButtonLink";

function NewsForm({ handleSubmit, btnText, newsData, newsError }) {
  const [news, setNews] = useState(newsData || {});

  function handleChange(e) {
    if (e.target.name === "autor") {
      news.autor
        ? setNews({ ...news, [e.target.name]: e.target.value })
        : setNews({
            ...news,
            [e.target.name]: e.target.value,
            date: createDate(),
          });
    } else {
      setNews({ ...news, [e.target.name]: e.target.value });
    }
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(news);
  }

  function createDate() {
    const date = new Date();
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const newsDate = `${date.getDate()} de ${month} de ${date.getFullYear()}`;
    return newsDate;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submit} className={styles.formContainer}>
        <Input
          type="text"
          text="Título da notícia"
          name="title"
          placeholder="Escreva o título da notícia"
          handleOnChange={handleChange}
          value={news.title ? news.title : ""}
        />
        <Input
          type="text"
          text="Autor"
          name="autor"
          placeholder="Escreva seu nome"
          handleOnChange={handleChange}
          value={news.autor ? news.autor : ""}
        />
        <Input
          type="text"
          text="Imagem da notícia"
          name="img"
          placeholder="Cole o endereço da imagem"
          handleOnChange={handleChange}
          value={news.img ? news.img : ""}
        />
        <Input
          type="text"
          text="Descrição da imagem"
          name="alt"
          placeholder="Descreva a imagem"
          handleOnChange={handleChange}
          value={news.alt ? news.alt : ""}
        />
        <Input
          type="text"
          text="Clube a qual a news se refere"
          name="newsTeam"
          placeholder="Digite o nome do time, apenas o último nome"
          handleOnChange={handleChange}
          value={news.newsTeam ? news.newsTeam : ""}
        />
        <TextArea
          text="Corpo"
          name="newsBody"
          placeholder="Escreva a notícia"
          handleOnChange={handleChange}
          value={news.newsBody ? news.newsBody : ""}
        />
        <div className={styles.buttonContainer}>
          <SubmitButton text={btnText} />
          <ButtonLink to="/" text="Voltar" />
        </div>

        {newsError && (
          <div className={styles.showNewsErrorClass}>
            <p>Você não pode modificar informações preexistentes</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default NewsForm;
