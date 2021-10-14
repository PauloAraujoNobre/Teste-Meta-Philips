import { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Header, TextInput } from "../components";
import { User } from "../types";
import Button from '@mui/material/Button';
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

type Params = {
  id: string | undefined;
}

export default () => {
  const history = useHistory();
  let params: Params = useParams();

  const [user , setUser] = useState<User>(initialValues)
  
  const handleChange = (e: any) => {
    const {id , value} = e.target   
    setUser(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const updateAccount = () => {
    if(user.email.length && user.password.length) {
      const payload = {
        user: {
          "name": user.name,
          "email": user.email,
          "birthDate": user.birthDate,
          "address": user.address,
          "password": user.password,
        },
        newPassword: user.confirmPassword
      }
      
      axios.put(`http://localhost:8080/v1/user/${params.id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }})
        .then(function (response: any) {
          if (response.status === 200) {
            setUser((prevState: User) => ({
              ...prevState,
              'successMessage': 'Registration successful. Redirecting to home page..'
            }))

            alert("User updated successfully!")
            history.push(`/profile/${params.id}`)
          } else if (response.status === 202) {
            if (response.data === 'password') {
              alert('Current password its wrong')
            } else if (response.data === 'email') {
              alert('This email already in use')
            }
          }
        })
        .catch(function (error: any) {
          console.log(error);
        });    
    }
  }

  return (
    <div className="update">
      <div className="form"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 12
          }}>
      <form>
        <Header title="Update Profile" />

        <TextInput value={user.name} onChange={handleChange} type="name" id="name" label="Name" placeholder="Enter Name" />
        
        <TextInput value={user.email} onChange={handleChange} type="email" id="email" label="Email" placeholder="Enter email" />

        <TextInput value={user.birthDate} onChange={handleChange} type="birthDate" id="birthDate" label="Birth Date" placeholder="Enter Birth Date" />

        <TextInput value={user.address} onChange={handleChange} type="address" id="address" label="Address" placeholder="Enter Address" />
        
        <TextInput value={user.password} onChange={handleChange} type="password" id="password" label="Enter Current Password" placeholder="Enter Current Password" />

        <TextInput value={user.confirmPassword} onChange={handleChange} type="confirmPassword" id="confirmPassword" label="Enter New Password" placeholder="Enter New Password" />

        <div className="button" style={{
                                        flex: 1,
                                        display: 'flex',
                                        marginTop: 15,
                                        justifyContent: 'center'
        }}>
          <Button onClick={() => history.goBack()} style={{color: '#AAA'}}>Back</Button>

          <Button onClick={updateAccount} style={{color: '#AAA'}}>
            Update
          </Button>
        </div>
      </form>
    </div>
  </div>
  )
}