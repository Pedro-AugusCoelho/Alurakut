import React,{ useEffect, useState } from 'react';
import BoxFeedNewsHeader from '../src/componentes/boxFeedNewsHeader';
import BoxNews from '../src/componentes/BoxNews'
import BoxLike from '../src/componentes/BoxLike/BoxLike';
import Box from '../src/componentes/Box';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { format } from 'date-fns';



export default function AreaNews(props){

  useEffect(function(){
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5a9cb0706db64f945769c1df73d9cc',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allPublications{
          id
          text
          imageurl
          namecreate
          date
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((responseComplet) => {
      const NewsDato = responseComplet.data.allPublications;
      setNews(NewsDato);
    })
  },[]);
  
  const [ news , setNews ] = useState([]);
  
  return(
           
  <div>
      {
        news.map((val) => {
          return(
            <Box>   
                    <BoxFeedNewsHeader>
                      <div className='FeedNewsNav'>
                        
                        <div style={{gridArea:'imgPerfil'}}>
                            <img src={`https:/github.com/${val.namecreate}.png`}/>
                        </div>
                        
                        <div className='feedHeaderContainer' style={{gridArea:'title'}}>
                            <span>Mario Souto</span>
                            <p>35 Min</p>
                        </div>

                        <div className='FeedNewsNavMenu' style={{gridArea:'menuNav'}}>
                            <a>
                              <p>...</p>
                            </a>
                        </div>

                      </div>
                    </BoxFeedNewsHeader>

                    <BoxNews>
                          <p>{val.text}</p>
                          <img src={val.imageurl}/>
                    </BoxNews>

                    <BoxLike>
                        <div className='containerLike' style={{gridArea:'containerLike' , alignItems:'center'}} >
                          <AiOutlineLike size={20} color={'white'}/>
                          <span>10</span>
                        </div>
                        
                        <div className='containerComment' style={{gridArea:'containerComment'}}>
                          <AiOutlineMessage size={20} color={'white'}/>
                          <span>10</span>
                        </div>
                        
                        <div className='containerShare' style={{gridArea:'containerShare'}}>
                          <AiOutlineShareAlt size={20} color={'white'}/>
                          <span>10</span>
                        </div>
                    </BoxLike>
            </Box>
          )
        })
      }                
  </div>

  

  )
}














