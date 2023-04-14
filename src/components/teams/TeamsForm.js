import { useState, useEffect } from "react";

import Input from "../Form/Input";
import SubmitButton from "../Form/SubmitButton";
import Select from "../Form/Select";
import Content from "../data/Content";
import ButtonLink from "../layout/ButtonLink";

import styles from "./TeamsForm.module.css";

function TeamForm({ handleSubmit, btnText, teamData, teamError }) {
  const [conference, setConference] = useState([]);
  const [division, setDivision] = useState([]);
  const [team, setTeam] = useState(teamData || {});

  useEffect(() => {
    setConference(Content.conference);
    // fetch(`http://localhost:5000/conference`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setConference(data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setDivision(Content.division);
    // fetch(`http://localhost:5000/division`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setDivision(data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(team);
  };

  function handleChange(e) {
    setTeam({ ...team, [e.target.name]: e.target.value });
  }

  function handleSelect(e) {
    if (e.target.name === "conference_id") {
      setTeam({
        ...team,
        conference: {
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      });
      return;
    }

    setTeam({
      ...team,
      division: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <div className={styles.container}>
      {teamError && (
        <div className={styles.showTeamErrorClass}>
          <p>Você não pode modificar informações preexistentes</p>
        </div>
      )}

      <form onSubmit={submit} className={styles.formContainer}>
        <Input
          type="text"
          text="Nome do time"
          name="name"
          placeholder="Digite o nome do time"
          handleOnChange={handleChange}
          value={team.name ? team.name : ""}
        />
        <Input
          type="text"
          text="Imagem do time"
          name="img"
          placeholder="Cole o endereço da imagem"
          handleOnChange={handleChange}
          value={team.img ? team.img : ""}
        />
        <Input
          type="number"
          text="Títulos"
          name="sb_titles"
          placeholder="Digite o número de titulos do Super Bowl"
          handleOnChange={handleChange}
          value={team.sb_titles ? team.sb_titles : ""}
        />
        <Select
          name="conference_id"
          title="Conferência"
          text="Escolha a conferência"
          options={conference}
          handleOnChange={handleSelect}
          value={team.conference ? team.conference.id : ""}
        />
        <Select
          name="division_id"
          title="Divisão"
          text="Escolha a divisão"
          options={division}
          handleOnChange={handleSelect}
          value={team.division ? team.division.id : ""}
        />
        <div className={styles.buttonContainer}>
          <SubmitButton text={btnText} />
          <ButtonLink to="/times" text="Voltar" />
        </div>
      </form>
    </div>
  );
}

export default TeamForm;
