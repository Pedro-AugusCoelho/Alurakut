import React,{ useState } from 'react';
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
    'omariosouto' ,
    'peas' ,
    'juunegreiros' ,
    'marcobrunodev' ,
    'felipefialho',
  ]
  const [community , setcommunity] = useState([{
    id: '1',
    title: 'Alurakut',
    image: "https://picsum.photos/200",
  }]);
  
  
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
                  id: new Date().toISOString,
                  title: diceForm.get('title'),
                  image: diceForm.get('image'),
                }
                let communityNew = [...community , communityDice]

                if(communityNew.length > 6 ){
                  alert('Limite Máximo atingindo')
                }else{
                  setcommunity(communityNew);
                } 
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
                        placeholder='Coloque uma URL para usarmos de capa' 
                        name='image' 
                        aria-label='Qual vai ser o nome da sua comunidade ?'
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

            <ul>
                {
                  community.map((val) => {
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
                  
                  peopleFav.map((val) => {
                      return(
                          <li key={val}>
                            <a href={`/users/${val}`}>
                              <img src={`https://github.com/${val}.png`} />
                              <span>{val}</span>
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
