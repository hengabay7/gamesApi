import React ,{useState} from "react";
import { Button , Container , Row ,Col , Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const GameItem = props => {
const baseUrl = 'http://localhost:3001/api';
const [isEditable, setisEditable] = useState(false);
const [gameName, setgameName] = useState(props.game.gameName);
const [gamePrice, setgamePrice] = useState(props.game.gamePrice);

const updateGame = async() => {
  const response =await fetch(baseUrl + "/updateGame/"+ props.game._id,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
      gameName:gameName,
      gamePrice: gamePrice,
      isAailable: props.game.isAailable,
      genreId: props.game.genreId,
      gameDescription: props.game.gameDescription,
      gameImage: props.game.gameImage
    })
  });
  const data = await response.json();
  setisEditable(false);
  props.loadAllGames();
}

    return(
    <> 
    {
        isEditable ? (
          <>
           <Card style={{marginTop:12}}>
            <div style={{overflow:'hidden', width:'100', height:180}} >
         <Card.Img variant="top" src={props.game.gameImage} />
           </div>
        <Card.Body>

          <Form.Control type="text" value={gameName} onChange={(e) =>{setgameName(e.target.value)}}/> 
          <Form.Control type="text" value={gamePrice} onChange={(e) =>{setgamePrice(e.target.value)}}/>
          
        <Container>
            <Row>
              <Col>
                <Button variant="info" onClick={() => setisEditable(!isEditable)}>Back</Button>
              </Col>
              <Col>
                <Button variant="success" onClick={updateGame}>Save </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
       </Card>
      </>
    ) : (
        <>
        <Card style={{marginTop:12}}>
            <div style={{overflow:'hidden', width:'100', height:180}} >
         <Card.Img variant="top" src={props.game.gameImage} />
           </div>
        <Card.Body>
          <Card.Title style={{fontSize:15}}>{props.game.gameName}</Card.Title>
          <Card.Text>Gener: {props.game.genreId.genreName} </Card.Text>
          <Card.Text><b style={{fontSize:24}}>${props.game.gamePrice}</b></Card.Text>
          <Container>
             <Row>
               <Col>
                  <Button variant="info" onClick={() => setisEditable(!isEditable)}>Edit</Button>
                </Col>
              <Col>
               <Button variant="danger" onClick={props.deleteGameClick}>Delete</Button>
          </Col>
        </Row>
       </Container>
        </Card.Body>
     </Card>    
      </> 
      )
    }
    </>
  )
}


export default GameItem;