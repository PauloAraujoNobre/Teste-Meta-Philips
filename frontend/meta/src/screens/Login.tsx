import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { TextInput, Header } from "../components/index";
import { User } from "../types";

import Button from '@mui/material/Button';
import Navigator from "../router/navigator";
import axios from "axios";

const initialValues = {
  name: "",
  cpf: "",
  birthDate: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: ""
}

export default () => {
  const history = useHistory();
  const [user, setUser] = useState<User>(initialValues)
  
  const handleChange = (e: any) => {
    const {id , value} = e.target   
    setUser(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const handleSubmitClick = (e: any) => {
    e.preventDefault();
    loginToServer();
  }

  const loginToServer = () => {
    if (user.email.length && user.password.length) {
      const payload = {
        "email": user.email,
        "password": user.password,
      }
      
      axios.post('http://localhost:8080/v1/user/login', payload, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }})
        .then(function (response: any) {
          if (response.status === 200) {
            alert("Login successfully!")
            history.push(`/profile/${response.data.id}`)
          } else {
            alert("Email or Password it's wrong!")
          } 
        })
        .catch(function (error: any) {
          console.log(error);
        });    
    }
  }

  return (
    <div>
      <Navigator />
      <div className="login"
           style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 12
            }}>
        <form>
          <Header title="Log in" />

          <TextInput value={user.email} onChange={handleChange} type="email" id="email" label="Email" placeholder="Enter Email" />
          <TextInput value={user.password} onChange={handleChange} type="password" id="password" label="Password" placeholder="Enter Password" />

          <div className="button" style={{
                                          flex: 1,
                                          display: 'flex',
                                          marginTop: 15,
                                          justifyContent: 'center',}}>
            <Button onClick={handleSubmitClick} style={{color: '#AAA'}}>
              Sing in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
