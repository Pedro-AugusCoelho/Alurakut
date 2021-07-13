import MainGrid from "../src/componentes/MainGrid";
import Box from "../src/componentes/Box";
import {AlurakutMenu , OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/componentes/ProfileRelationsBoxWrapper';



function PropileSideBar(props) {
  return( 
  <Box>
    <img src={`https:/github.com/${props.GitHubUsers}.png`} style={{width:'100%'}} />
  </Box>
  )
}

export default function Home() {
  const GitHubUsers = 'peas';
  const peopleFav= ['omariosouto' , 'peas' , 'juunegreiros' , 'marcobrunodev' , 'felipefialho']
  
  
  return (
      <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea:'profileArea' }}>
          <PropileSideBar GitHubUsers={GitHubUsers} />
        </div>
        
        <div className='welcomeArea' style={{ gridArea:'welcomeArea' }}>
            <Box>
            <h1 className='title'>Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
            </Box>
        </div>
        
        <div className='profileRelationsArea' style={{ gridArea:'profileRelationsArea '}}>
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({peopleFav.length})
            </h2>

            <ul>
              {peopleFav.map((val) => {
                return (
                  <li key={val}>
                    <a href={`/users/${val}`}>
                      <img src={`https://github.com/${val}.png`} />
                      <span>{val}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      
      </MainGrid>
      </>
  )
}
