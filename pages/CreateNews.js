import Box from "../src/componentes/Box";


export default function CreateNews({githubUser}){
  return(
    <Box>

            <h2>Faça uma publicação</h2>

            <form onSubmit={ function handleNewCommunity(e){
                e.preventDefault();
                const diceForm = new FormData(e.target);
                
                const Publication = {
                  text: diceForm.get('text'),
                  imageurl: diceForm.get('image'),
                  namecreate: githubUser,
                }

                console.log(githubUser);
                console.log(Publication);

                fetch('/api/Publications', {
                  method:'POST',
                  headers:{
                    'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify(Publication)
                }).then(async (response) => {
                  const dados = await response.json()
                  const newsNew = (dados.RegistroCriado);
                  alert('Foi publicado com sucesso');
                })
               
            }}>
              
              <div style={{marginTop:10}}>
                  <input 
                        placeholder='No que você esta pensando ?' 
                        name='text' 
                        aria-label='No que você esta pensando ?'
                        type='text'
                  />
              </div>

              <div>
                  <input 
                        placeholder='Coloque a URL da sua imagem aqui'
                        name='image' 
                        aria-label='Coloque a URL da sua imagem aqui'
                        type='text'
                  />
              </div>

              <button style={{backgroundColor:'#75D30B'}}>
                Publicar
              </button>
            </form>
    </Box>
  )
}