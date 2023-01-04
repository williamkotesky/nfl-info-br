// import styles from './NovaNews.module.css';
import NewsForm from "../news/NewsForm";
import { useNavigate } from 'react-router-dom'


function NovaNews() {

    const history = useNavigate();

    function createPost(news) {
        
        fetch('http://localhost:5000/news', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(news)
        }).then((resp) => resp.json())
        .then((data) => {
            history('/', {state: { message: 'News postada com sucesso' }})
            
        })
        .catch((err) => console.log(err));
    }

    return(
        <section>
            <NewsForm handleSubmit={createPost}  btnText='Publicar News' />  
        </section>
    )
}

export default NovaNews;