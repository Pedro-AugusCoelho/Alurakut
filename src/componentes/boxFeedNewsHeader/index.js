import styled from 'styled-components';

const BoxFeedNewsHeader = styled.div`
  width: '100%';
  padding: 5px;
  flex: 1;

  .FeedNewsNav{
    display: grid;
    grid-template-areas: "imgPerfil title menuNav";
    grid-template-columns: 60px 1fr 60px;
    text-decoration: none;
    padding: 5px;
  
    .FeedNewsNavMenu{
      font-size: 22px;
      text-align: right;
      font-weight: bold;
    }

    .feedHeaderContainer{
      
      span{
      font-size: 18px;
      font-weight: bold;
      color: black;
      }
      p{
        font-size: 16px;
        font-weight: bold;
        color: #505050;
      }
    
    }
  }
  img {
    width:40px;
    height:40;
    margin-right:10px;
    border-radius:20px;
  }
`;

export default BoxFeedNewsHeader;