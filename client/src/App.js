import React, {useState, useEffect} from 'react';
import './App.css';
import { Button , Container , Row ,Col , Form, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import GameItem from './components/GameItem';
import axios from 'axios';

function App() {

  const baseUrl = 'http://localhost:3001/api';
  const [games, setAllGames] = useState ([]);
  const [geners,setAllGeners] = useState ([]);

  const [selectedGenre , setSelectedGenrs] = useState ("");
  const [selectedGameName , setSelectedGameName] = useState ("");
  const [selectedGamePrice , setSelectedGamePrice] = useState ("");
  const [selectedDescription , setSelectedDescription] = useState ("");
  const [selectedGameImage, setSelectedGameImage] = useState ("");
  

  const [firstName, setFirstName] = useState ("");
  const [lastName, setLastName] = useState ("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const [mobile, setMobile] = useState ("");


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


  const deleteProductById = async(gid) => {
    try{
    const response = await fetch(baseUrl + "/deleteGame/" + gid,{
      method: 'DELETE'
    });
    const data = await response.json();
    toast.success(data.message)
    loadAllGames();
   } catch (error) {
      toast.error(error.message)
    }
  }


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


const creacteNewAccount = async() => {

  if(firstName !== "" && lastName !== "" && password !== ""){
    const user = {
      firstName: firstName,
      lastName: lastName,
      email:email,
      password: password,
      mobile: mobile
    }

    axios.post(baseUrl + '/account/createAccount', {user})
    .then(results => {
    toast.success(results.data.message.email);
    })
    .catch(error => {
      toast.error(error.response.data.message);
    })

  } else {
    toast.error("All input are required!!!");
  }
}
  

const login = async() => {
  if(email !=="" && password !==""){
    const user = {    
      email:email,
      password: password,  
    }

    axios.post(baseUrl + '/account/login', {user})
    .then(results => {
    toast.success(results.data.message);
    })
    .catch(error => {
      toast.error(error.response.data.message);
    })

  } else {
    toast.error("All input are required!!!");
  }
}

  return (
    <div className="App">
      <Container>
      <ToastContainer />

        <Header />

        <Row style={{marginTop:100}}>
          <Col xl={3} xs={12}>

          <Form>
          <Form.Control type="text" value={firstName}
             onChange={(e) => {setFirstName(e.target.value)}}
             placeholder="First Name" style={{marginTop:10}} /> 

            <Form.Control type="text" value={lastName}
             onChange={(e) => {setLastName(e.target.value)}}
             placeholder="Last name" style={{marginTop:10}} /> 

             <Form.Control type="email" value={email}
             onChange={(e) => {setEmail(e.target.value)}}
             placeholder=" email " style={{marginTop:10}} /> 

             <Form.Control type="password" value={password}
             onChange={(e) => {setPassword(e.target.value)}}
             placeholder="Password" style={{marginTop:10}} /> 

             <Form.Control type="phone" value={mobile}
             onChange={(e) => {setMobile(e.target.value)}}
             placeholder="Mobile" style={{marginTop:10}} /> 

            <Button variant='info' 
            onClick={creacteNewAccount}
            style={{marginTop:10, width:'100%'}}> Sing Up</Button> 

            <Button variant='warning' 
            onClick={login}
            style={{marginTop:10, width:'100%'}}> login</Button>
          </Form>
          

            {/* <Form>
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
            </Form> */}

          </Col>
          <Col xl={9} xs={12}>
            <Row>
            {
              games.length > 0 ?              
                games.map((item) => (
                <Col xl={4} >
                  <GameItem deleteGameClick={() => {deleteProductById(item._id)}} game={item} loadAllGames={loadAllGames} />
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
