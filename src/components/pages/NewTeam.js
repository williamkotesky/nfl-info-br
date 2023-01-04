import { useNavigate } from 'react-router-dom';

import TeamsForm from '../teams/TeamsForm';

import styles from './NewTeam.module.css';

function NewTeam() {

    const history = useNavigate();

    function createPost(team) {
        
        fetch('http://localhost:5000/teams', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(team)
        }).then((resp) => resp.json())
        .then((data) => {
            history('/times', {state: { message: 'Time registrado com sucesso' }})
            
        })
        .catch((err) => console.log(err));
    }

    return (
        <section className={styles.newTeamContainer}>
                <h2 className={styles.newTeamContainerTitle}>Registre um novo time:</h2>
                <TeamsForm handleSubmit={createPost} btnText='Registrar Time' />
            
        </section>
    )      
}

export default NewTeam;