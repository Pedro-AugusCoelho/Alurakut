import styled from 'styled-components';

const BoxLike = styled.div`
  width: "100%";
  padding:10px;

  display: grid;
  grid-gap: 10px;
  grid-template-areas: "containerLike containerComment containerShare";
  grid-template-columns: "33.3% 33.3% 33.3%";

  .containerLike{
    width: '100%';
    background-color: #002f;
    padding:10px 0;
    border-radius: 20px;

    text-align: center;
    color:white;
  }

  .containerComment{
    width: '100%';
    background-color: #002f;
    padding:10px 0;
    border-radius: 20px;

    text-align: center;
    color:white;
  }

  .containerShare{
    width: '100%';
    background-color: #002f;
    padding:10px 0;
    border-radius: 20px;

    text-align: center;
    color:white;
  }

`;

export default BoxLike;
