import React,{ useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from "../src/componentes/MainGrid";
import Box from "../src/componentes/Box";
import {AlurakutMenu , AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/componentes/ProfileRelationsBoxWrapper';
import AreaNews from './AreaNews';
import CreateNews from './CreateNews';




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

export default function Home(props) {
  const GitHubUsers = props.githubUser;
  const [peopleFav , setPeopleFav] = useState([]);
  const [community , setcommunity] = useState([]);

  const [ follows , setfollows ] = useState([]);
  
  useEffect(function(){
      
    fetch('https://api.github.com/users/omariosouto/followers').then(function(response){
        return response.json();
      }).then(function(responseTwo){
        setfollows(responseTwo);
    });
  },[]);

  useEffect(function(){
    //Pegar do DATO AS INFORMAÇÕES SOBRE Community
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5a9cb0706db64f945769c1df73d9cc',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((responseComplet) => {
     const communitysDato = responseComplet.data.allCommunities;
     setcommunity(communitysDato);
    })

    //Pegar do DATO AS INFORMAÇÕES SOBRE Pessoas da comunidade
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5a9cb0706db64f945769c1df73d9cc',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allPeoplefavs{
          id
          name
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((responseComplet) => {
     const communitysPeopleFavDato = responseComplet.data.allPeoplefavs;
     setPeopleFav(communitysPeopleFavDato);
    })
  
  }, []);
  
  return (
      <>
      <AlurakutMenu githubUser={GitHubUsers} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea:'profileArea' }}>
          <PropileSideBar GitHubUsers={GitHubUsers} />
        </div>
        
        <div className='welcomeArea' style={{ gridArea:'welcomeArea' }}>
            <Box>
            <h1 className='title'>Bem Vindo(a), {props.githubUser}</h1>
            <OrkutNostalgicIconSet />
            </Box>

            <Box>
            <h2>O que voce deseja fazer ?</h2>

            <form onSubmit={ function handleNewCommunity(e){
                e.preventDefault();
                const diceForm = new FormData(e.target);
                
                const communityDice = {
                  title: diceForm.get('title'),
                  imageUrl: diceForm.get('image'),
                  creatorSlug: GitHubUsers,
                }

                fetch('/api/community', {
                  method:'POST',
                  headers:{
                    'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify(communityDice)
                }).then(async (response) => {
                  const dados = await response.json()
                  console.log(dados.RegistroCriado);
                  const communityCriado = dados.RegistroCriado
                  setcommunity({...community , communityCriado });
                })
               
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

              <button style={{backgroundColor:'#75D30B'}}>
                Criar comunidade
              </button>
            </form>
            </Box>

            <CreateNews githubUser={GitHubUsers} />


           
            <AreaNews></AreaNews>
        
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
                  community.slice(0,6).map((val) => {
                  return (
                    <li key={val.id}>
                      <a href={`/community/${val.id}`}>
                        <img src={val.imageUrl}/>
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
                          <li key={val.id}>
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth',{
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  /*if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }*/

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
