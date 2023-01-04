import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonLink from '../layout/ButtonLink';
import Card from '../layout/Card';
import Loading from '../layout/Loading';
import Message from '../layout/Message';
import styles from './Times.module.css';

function Times() {

    const [teams, setTeams] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [addTeamMessage, setAddTeamMessage] = useState('');
    const [teamMessage, setTeamMessage] = useState('');

    const location = useLocation();

    

    useEffect(() => {

        if(location.state) {
            setAddTeamMessage(location.state.message)
        }
        
        setTimeout(() => {
            fetch(`http://localhost:5000/teams`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setTeams(data);
            setRemoveLoading(true);
            })
        .catch(err => console.log(err))
        }, 1000);

    }, [addTeamMessage, location.state]);

    
    
    function removeTeam(id) {
        fetch(`http://localhost:5000/teams/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then( () => setTeams(teams.filter((team) => team.id !== id)))
        setTeamMessage('Time removido com sucesso')
        .catch(err => console.log(err))

    }


    return (
        <section className={styles.timesContainer}>
                <div><h1>Times Favoritos</h1></div>
                <div className={styles.linkDiv}>
                    <ButtonLink to='/newteam' text='Registrar novo time' />
                </div>
                {addTeamMessage && <Message msg={addTeamMessage} type='success' />}
                

                {teamMessage && <Message msg={teamMessage} type='success' />}
                <div className={styles.timesGrid}>
                    {teams.length>0 && teams.map((team) => (
                        <Card id={team.id}
                              name={team.name} 
                              img={team.img} 
                              titles={team.sb_titles} 
                              conference={team.conference ? team.conference.name : 'none'} 
                              division={team.division ? team.division.name : 'none'}  
                              key={team.id} 
                              handleRemove={removeTeam} />
                    ))}
                    {!removeLoading && (<div className={styles.loadingPlace}><Loading /></div>)}
                    {removeLoading && teams.length === 0 && (
                        <p className={styles.zeroCadastro}>Não há times cadastrados.</p>
                    )}
                </div>
        </section>
    )
}

export default Times;