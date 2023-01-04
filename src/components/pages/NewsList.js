import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import ButtonLink from '../layout/ButtonLink';
import { Link } from 'react-router-dom';
// import Select from '../Form/Select';
import styles from './NewsList.module.css';

function NewsList() {

    const [news, setNews] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    // const [select, SetSelect] = useState({});

    useEffect(() => {
        setTimeout(() => {
          fetch(`http://localhost:5000/news`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
          })
          .then(resp => resp.json())
          .then(data => {
              setNews(data);
              setShowLoading(true);
    
              })
          .catch(err => console.log(err))
        }, 1000);
          
      }, []);

      // const sortOptions = [{name:'Data', id:1}, {name:'Nome', id:2}]

      // function handleSelect(e) {
      //   news.map((item)=>{
      //       if(e.target.options[e.target.selectedIndex] === 2) {
      //           SetSelect(...news);
      //           news.map((i)=>i.name.sort())
      //           console.log(news)
                
      //       }
            
        
      //       return true;
      //   })
      // }

    return(
        <section className={styles.newsListContainer}>
            <h2>Lista de news do NFL INFO BR</h2>
            {/* <div className={styles.sortNews}>
              <Select name='sort' 
                      title='Classificar' 
                      text='Classificar por' 
                      options={sortOptions}
                      handleOnChange={handleSelect} 
                      value={sortOptions.name ? sortOptions.id : ''}   />
            </div> */}
            <ul>
            {news.slice(0).reverse().map((item)=> (
                <li className={styles.listItem} key={item.id}>
                    <Link to={`/${item.id}/${item.title.replace(/\s/g, '-').toLowerCase()}`}> 
                    <h4>- {item.title}</h4>
                    </Link>
                    <p>Por:</p> <span>{item.autor}</span><br/>
                    <p>Em:</p> <span>{item.date}</span>
                </li>
                 
            ))} 
            </ul>


            {!showLoading && (<div className={styles.loaderPlace}><Loading /></div>)}
            {showLoading && news.length === 0 && (
          <div className={styles.zeroNews}>
            <p>Site sem news. Escreva uma news clicando no botão abaixo:</p>
            <ButtonLink to="/writenews" text="Escrever News" />
          </div>
        )}   
        </section>
    )
}

export default NewsList;