import React, {useState, useEffect} from 'react';
import './App.css';
import { Button , Container , Row ,Col , Form, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GameItem from './components/GameItem';

function App() {

  const baseUrl = 'http://localhost:3001/api';
  const [games, setAllGames] = useState ([]);
  const [geners,setAllGeners] = useState ([]);

  const [selectedGenre , setSelectedGenrs] = useState ("");
  const [selectedGameName , setSelectedGameName] = useState ("");
  const [selectedGamePrice , setSelectedGamePrice] = useState ("");
  const [selectedDescription , setSelectedDescription] = useState ("");
  const [selectedGameImage, setSelectedGameImage] = useState ("");

  const loadAllGames = async() => {
    const response =await fetch(baseUrl + "/readAllGames",{
      method: 'GET'
    })
    const data = await response.json();
      setAllGames(data.message);
  }

  const loadGenres = async () => {
    const response =await fetch(baseUrl + "/readAllGeners",{
      method: 'GET'
    })
    const data = await response.json();
    setAllGeners(data.message);
  }


  useEffect(() => {
    loadAllGames();
    loadGenres()
  },[]);


  const addnewgame = async() => {
    if(selectedGameName !== "" && selectedGamePrice !== "" && selectedGenre !== ""){

      const response = await fetch(baseUrl + "/createGame", {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          genreId: selectedGenre,
          gameName: selectedGameName,
          gamePrice: selectedGamePrice,
          gameDescription: selectedDescription,
          gameImage: selectedGameImage
        })
      });

      const data = await response.json();
      toast.success(`${data.message.gameName} was created`);
      loadAllGames();
    } else {
      toast.error("Game name and price is require!!")
    }
  }


  return (
    <div className="App">
      <Container>
      <ToastContainer />

        <Row>
          <Col></Col>
        </Row>

        <Row style={{marginTop:100}}>
          <Col xl={3} xs={12}>

            <Form>
            <Form.Select onChange={(e) => {setSelectedGenrs(e.target.value)}} >
              <option>Open this select menu</option>
              {
                geners.length > 0 && 
                geners.map((genre) => (
                  <option value={genre._id}>{genre.genreName}</option>
                ))
              }
             
            </Form.Select>
            <Form.Control type="text" value={selectedGameName}
             onChange={(e) => {setSelectedGameName(e.target.value)}}
             placeholder="Game name" style={{marginTop:10}} />   

            <Form.Control type="text" value={selectedGamePrice}
             onChange={(e) => {setSelectedGamePrice(e.target.value)}}
             placeholder="Game price" style={{marginTop:10}} />   

            <Form.Control type="text" value={selectedDescription}
             onChange={(e) => {setSelectedDescription(e.target.value)}}
             placeholder="Game description" style={{marginTop:10}} />   

              <Form.Control type="text" value={selectedGameImage}
             onChange={(e) => {setSelectedGameImage(e.target.value)}}
             placeholder="Game image" style={{marginTop:10}} />   


              <Button variant='info' onClick={addnewgame} style={{marginTop:10, width:'100%'}}> Add New Game</Button>
            </Form>

          </Col>
          <Col xl={9} xs={12}>
            <Row>
            {
              games.length > 0 ?              
                games.map((item) => (
                <Col xl={4} >
                  <GameItem game={item} />
                </Col>
                ))                
               :               
               <p>NOPE</p>
            }
            </Row>
          </Col>
        </Row>

      </Container>
       
    </div>
  );
}

export default App;
