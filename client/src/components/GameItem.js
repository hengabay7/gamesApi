import React ,{useState} from "react";
import { Button , Container , Row ,Col , Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const GameItem = props => {

const [isEditable, setisEditable] = useState(false);
const [gameName, setgameName] = useState(props.game.gameName);
const [gamePrice, setgamePrice] = useState(props.game.gamePrice);



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
    ) : (
        <>
        <Card style={{marginTop:12}}>
            <div style={{overflow:'hidden', width:'100', height:180}} >
         <Card.Img variant="top" src={props.game.gameImage} />
           </div>
        <Card.Body>
          <Card.Title>{props.game.gameName}</Card.Title>
          <Card.Text>${props.game.gamePrice} </Card.Text>
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