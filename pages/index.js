import React,{ useEffect, useState } from 'react';
import MainGrid from "../src/componentes/MainGrid";
import Box from "../src/componentes/Box";
import {AlurakutMenu , AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/componentes/ProfileRelationsBoxWrapper';



function PropileSideBar(props) {
  return( 
  <Box as='aside'>
    <img src={`https:/github.com/${props.GitHubUsers}.png`} style={{borderRadius: 8}}/>
    <hr/>

    <p>
        <a className='boxLink' href={`https://github.com/${props.GitHubUsers}`}>
        @{props.GitHubUsers}
        </a>
    </p>
    
    <hr />
    <AlurakutProfileSidebarMenuDefault />
  </Box>
  )
}

export default function Home() {
  const GitHubUsers = 'omariosouto';
  const peopleFav= [
    {
      id: '0',
      name: 'omariosouto',
    },
    
    {
      id: '1',
      name: 'peas'
    },

    { 
      id: '2',
      name: 'juunegreiros' ,
    },
    
    {
      id: '3',
      name: 'marcobrunodev' ,
    },
    
    {
      id: '4',
      name: 'omariosouto',
    },

    {
      id: '5',
      name: 'felipefialho',
    },

    {
      id: '6',
      name: 'juunegreiros',
    },

    {
      id: '7',
      name: 'juunegreiros',
    },

    {
      id: '8',
      name: 'juunegreiros',
    },
    {
      id: '9',
      name: 'juunegreiros',
    },

  
  ]
  const [community , setcommunity] = useState(
    [
      {
        id: 1,
        title: 'Alurakut',
        image: "https://avatars.githubusercontent.com/u/37260?v=4",
      },
    ]
  );

  const [ follows , setfollows ] = useState([]);
  
  useEffect(function(){
      fetch('https://api.github.com/users/omariosouto/followers').then(function(response){
        return response.json();
      }).then(function(responseTwo){
        setfollows(responseTwo);
        console.log(responseTwo);
      })
  },[]);
  
  return (
      <>
      <AlurakutMenu githubUser={GitHubUsers} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea:'profileArea' }}>
          <PropileSideBar GitHubUsers={GitHubUsers} />
        </div>
        
        <div className='welcomeArea' style={{ gridArea:'welcomeArea' }}>
            <Box>
            <h1 className='title'>Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
            </Box>

            <Box>
            <h2>O que voce deseja fazer ?</h2>

            <form onSubmit={ function handleNewCommunity(e){
                e.preventDefault();
                const diceForm = new FormData(e.target);
                
                const communityDice = {
                  id: new Date().getDate      ,
                  title: diceForm.get('title'),
                  image: diceForm.get('image'),
                }
                let communityNew = [...community , communityDice]
                setcommunity(communityNew);
               
            }}>
              
              <div style={{marginTop:10}}>
                  <input 
                        placeholder='Qual vai ser o nome da sua comunidade ?' 
                        name='title' 
                        aria-label='Qual vai ser o nome da sua comunidade ?'
                        type='text'
                  />
              </div>

              <div>
                  <input 
                        placeholder='Coloque a URL para imagem '
                        name='image' 
                        aria-label='Coloque uma URL para usarmos de capa'
                        type='text'
                  />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
            
            
            
            </Box>
        </div>
        
        <div className='profileRelationsArea' style={{ gridArea:'profileRelationsArea '}}>
        <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Seguidores ({follows.length})
              </h2>

              <ul>
                {
                  follows.slice(0 , 6).map(function(val){
                      return(
                          <li key={val}>
                            <a href={`/users/${val}`}>
                              <img src={val.avatar_url}/>
                              <span>{val.login}</span>
                              <span>{i}</span>
                            </a>
                          </li>
                        )
                      })
                }
              </ul>
        </ProfileRelationsBoxWrapper>
        
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                    Comunidades ({community.length})
            </h2>

            <ul>
                {
                  community.slice(0 , 6).map((val) => {
                  return (
                    <li key={val.id}>
                      <a href={`/users/${val.title}`}>
                        <img src={val.image}/>
                        <span>{val.title}</span>
                      </a>
                    </li>
                  )
                })
                }
            </ul>
          </ProfileRelationsBoxWrapper>
        
          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({peopleFav.length})
              </h2>

              <ul>
                {
                  peopleFav.slice(0 , 6).map(function(val){
                      return(
                          <li key={val}>
                            <a href={`/users/${val.name}`}>
                              <img src={`https://github.com/${val.name}.png`} />
                              <span>{val.name}</span>
                            </a>
                          </li>
                        )
                      })
                }
              </ul>
            </ProfileRelationsBoxWrapper>
        </div>
      
      </MainGrid>
      </>
  )
}
