import { useState, useEffect } from 'react';

import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import Select from '../Form/Select';

import styles from './TeamsForm.module.css';


function TeamForm({ handleSubmit, btnText, teamData }) {
    const [conference, setConference] = useState([]);
    const [division, setDivision] = useState([]);
    const [team, setTeam] = useState(teamData || {});

    useEffect(() => {
        fetch(`http://localhost:5000/conference`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setConference(data)   
            
            })
        .catch(err => console.log(err))

    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/division`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setDivision(data)    
            })  
        .catch(err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(team)
    }

    function handleChange(e) {
        setTeam({...team, [e.target.name]: e.target.value})
        
    }

    function handleSelect(e) {
        if(e.target.name === 'conference_id') {
            setTeam({...team,
                conference: {
                    id: e.target.value,
                    name:e.target.options[e.target.selectedIndex].text
                }
                 })      
            return;
        }
        
        setTeam({...team, 
            division: {
                id: e.target.value,
                name:e.target.options[e.target.selectedIndex].text
            }})           
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submit} className={styles.formContainer}>
                <Input type='text' text='Nome do time' name='name' placeholder='Digite o nome do time' handleOnChange={handleChange} value={team.name ? team.name : ''} />
                <Input type='text' text='Imagem do time' name='img' placeholder='Cole o endere??o da imagem' handleOnChange={handleChange} value={team.img ? team.img : ''} />
                <Input type='number' text='T??tulos' name='sb_titles' placeholder='Digite o n??mero de titulos do Super Bowl' handleOnChange={handleChange} value={team.sb_titles ? team.sb_titles : ''} />
                <Select name='conference_id' title='Confer??ncia' text='Escolha a confer??ncia' options={conference} handleOnChange={handleSelect} value={team.conference ? team.conference.id : ''} />
                <Select name='division_id' title='Divis??o' text='Escolha a divis??o' options={division} handleOnChange={handleSelect} value={team.division ? team.division.id : ''}  />
                <SubmitButton text={btnText} />
            </form>
        </div>
    )
}

export default TeamForm;