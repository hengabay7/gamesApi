import React, { useState } from "react";
import { Button , Container , Row ,Col , Form, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = props => {
    const baseUrl = 'http://localhost:3001/api';
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [change,setChange] = useState(true);

    const [firstName, setFirstName] = useState ("");
    const [lastName, setLastName] = useState ("");
    const [mobile, setMobile] = useState ("");


    const chang=() => {
        setChange(!change)
        setEmail("")
        setPassword("")

    }

    const login = async() => {
        if(email !== "" && password !== ""){
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


    return(
        <Container>
            <ToastContainer />
            <Row>
                <Col xl={4}></Col>
                <Col xl={4} style={{
                 marginTop:100,
                padding:50,textAlign:'center',
                backgroundColor:'#ffff', borderRadius:20}}>

                <img src="../../logo.png" style={{width:200}} />
                
                <h3 style={{marginTop:30}}>Welcom Aboard</h3>
                    {
                        change ? (
                            <>
                                <p>Type Your Email and Password Login</p>
                                <Form>
                                <Form.Group>
                                    <Form.Label>Email addres</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                                </Form.Group>
            
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                                </Form.Group>
                                <Button  variant="outline-info"  style={{width:'100%',marginTop:18}} onClick={login}>Sing In</Button> 
                                </Form>
                            </>
                        )
                        :
                        (
                            <>
                             <p>Enter Details Please </p>                            
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
                  
                              <Button variant='outline-success' 
                              onClick={creacteNewAccount}
                              style={{marginTop:10, width:'100%'}}> Sing Up</Button>                 
                            </Form>
                            </>
                        )
                    }                    
                    <Button riant="outline-prvaimary" style={{width:'100%',marginTop:18}} onClick={chang}>Change Options</Button>
                </Col>

                <Col xl={4}></Col>
            </Row>
        </Container>
    )
}

export default Login;