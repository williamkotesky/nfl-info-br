import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import ButtonLink from "../layout/ButtonLink";
import Card from "../layout/Card";
import Loading from "../layout/Loading";
import Content from "../data/Content";
import Message from "../layout/Message";
import styles from "./Times.module.css";

function Times() {
  const [teams, setTeams] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  // eslint-disable-next-line
  const [addTeamMessage, setAddTeamMessage] = useState("");
  // eslint-disable-next-line
  const [teamMessage, setTeamMessage] = useState("");
  const [showTeamErrorDelete, setShowTeamErrorDelete] = useState(false);

  //   const location = useLocation();

  useEffect(() => {
    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageTeams")
    );
    if (localStorageRecover !== null) {
      setTeams(Content.teams.concat(localStorageRecover.teams));
      setRemoveLoading(true);
      return;
    }

    setTeams(Content.teams);
    setRemoveLoading(true);

    // if (location.state) {
    //   setAddTeamMessage(location.state.message);
    // }

    // setTimeout(() => {
    //     fetch(`http://localhost:5000/teams`, {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //     setTeams(data);
    //     setRemoveLoading(true);
    //     })
    // .catch(err => console.log(err))
    // }, 1000);
  }, []);

  function removeTeam(id) {
    if (id <= 5 && id % 1 === 0) {
      setShowTeamErrorDelete(true);
      return;
    }

    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageTeams")
    );
    const teamsArray = localStorageRecover.teams;
    const newTeamsArray = teamsArray.filter((item) => item.id !== id);
    localStorageRecover.teams = newTeamsArray;
    localStorage.setItem(
      "localStorageTeams",
      JSON.stringify(localStorageRecover)
    );
    window.location.reload();
    window.scrollTo(0, 0);

    // fetch(`http://localhost:5000/teams/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then(() => setTeams(teams.filter((team) => team.id !== id)))
    //   .catch((err) => console.log(err));
  }

  return (
    <section className={styles.timesContainer}>
      <div>
        <h1>Times Favoritos</h1>
      </div>
      <div className={styles.linkDiv}>
        <ButtonLink to="/newteam" text="Registrar novo time" />
      </div>
      {addTeamMessage && <Message msg={addTeamMessage} type="success" />}

      {teamMessage && <Message msg={teamMessage} type="success" />}

      {showTeamErrorDelete && (
        <div className={styles.showTeamErrorClass}>
          <p>Você não pode deletar informações preexistentes</p>
        </div>
      )}

      <div className={styles.timesGrid}>
        {teams.length > 0 &&
          teams.map((team) => (
            <Card
              id={team.id}
              name={team.name}
              img={team.img}
              titles={team.sb_titles}
              conference={team.conference ? team.conference.name : "none"}
              division={team.division ? team.division.name : "none"}
              key={team.id}
              handleRemove={removeTeam}
            />
          ))}
        {!removeLoading && (
          <div className={styles.loadingPlace}>
            <Loading />
          </div>
        )}
        {removeLoading && teams.length === 0 && (
          <p className={styles.zeroCadastro}>Não há times cadastrados.</p>
        )}
      </div>
    </section>
  );
}

export default Times;
