import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Header, TextInput } from "../components";
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
  const [user , setUser] = useState<User>(initialValues)
  
  const handleChange = (e: any) => {
    const {id , value} = e.target   
    setUser(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const handleSubmitClick = (e: any) => {
    e.preventDefault();
    if(user.password === user.confirmPassword) {
      sendDataToServer()
    } else {
      alert("Passwords many different!")
    }
  }

  const sendDataToServer = () => {
    if(user.email.length && user.password.length) {
      const payload = {
        "name": user.name,
        "cpf": user.cpf,
        "email": user.email,
        "birthDate": user.birthDate,
        "address": user.address,
        "password": user.password,
      }
      
      axios.post('http://localhost:8080/v1/user', payload, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }})
        .then(function (response: any) {
          if(response.status === 201) {
            setUser((prevState: User) => ({
              ...prevState,
              'successMessage' : 'Registration successful. Redirecting to home page..'
            }))

            alert("User registered successfully!")
            history.push("/login")
          } else if (response.status === 202) {
            alert("CPF and/or Email already in use!")
          }
        })
        .catch(function (error: any) {
            console.log(error);
        });    
    }
  }

  return (
    <div className="register">
      <Navigator />

      <div className="form"
           style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 12
            }}>
        <form>
          <Header title="Register" />

          <TextInput value={user.name} onChange={handleChange} type="name" id="name" label="Name" placeholder="Enter Name" />
          
          <TextInput value={user.email} onChange={handleChange} type="email" id="email" label="Email" placeholder="Enter email" />

          <TextInput value={user.cpf} onChange={handleChange} type="cpf" id="cpf" label="Cpf" placeholder="Enter CPF" />

          <TextInput value={user.birthDate} onChange={handleChange} type="birthDate" id="birthDate" label="Birth Date" placeholder="Enter Birth Date" />

          <TextInput value={user.address} onChange={handleChange} type="address" id="address" label="Address" placeholder="Enter Address" />
          
          <TextInput value={user.password} onChange={handleChange} type="password" id="password" label="Password" placeholder="Enter Password" />

          <TextInput value={user.confirmPassword} onChange={handleChange} type="confirmPassword" id="confirmPassword" label="Confirm Password" placeholder="Confirm Password" />

          <div className="button" style={{
                                          flex: 1,
                                          display: 'flex',
                                          marginTop: 15,
                                          justifyContent: 'center',}}>
            <Button onClick={handleSubmitClick} style={{color: '#AAA'}}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}