import React,{ useEffect, useState } from 'react';
import BoxFeedNewsHeader from '../src/componentes/boxFeedNewsHeader';
import BoxNews from '../src/componentes/BoxNews'
import BoxLike from '../src/componentes/BoxLike/BoxLike';
import Box from '../src/componentes/Box';

export default function AreaNews(props){
  
  const [ news , setNews ] = useState(
    [
      {
        name:'omariosouto',
        imageUrl:'https://picsum.photos/700'
      }
    ]
  )
  
  return(
           
  <>
      <Box>   
                      <BoxFeedNewsHeader>
                      <div className='FeedNewsNav'>
                        
                        <div style={{gridArea:'imgPerfil'}}>
                            <img src={`https:/github.com/${props.GitHubUser}.png`}/>
                        </div>
                        
                        <div className='feedHeaderContainer' style={{gridArea:'title'}}>
                            <span>Mario Souto</span>
                            <p>44 min</p>
                        </div>

                        <div className='FeedNewsNavMenu' style={{gridArea:'menuNav'}}>
                            <a>
                              <p>...</p>
                            </a>
                        </div>

                      </div>
                      </BoxFeedNewsHeader>

                      <BoxNews>
                          <img src={`https://picsum.photos/700`}/>
                      </BoxNews>

                      <BoxLike>
                        <div className='containerLike' style={{gridArea:'containerLike'}}>
                            <span>/°|°\</span>
                            <span>173</span>
                        </div>
                        
                        <div className='containerComment' style={{gridArea:'containerComment'}}>
                            <span>/°|°\</span>
                            <span>173</span>
                        </div>
                        
                        <div className='containerShare' style={{gridArea:'containerShare'}}>
                            <span>/°|°\</span>
                            <span>173</span>
                        </div>

                      </BoxLike>
    </Box>

                  
  </>

  

  )
}














