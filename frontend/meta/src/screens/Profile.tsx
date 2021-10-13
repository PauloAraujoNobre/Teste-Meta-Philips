import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Header, TextInput } from "../components";
import { User } from '../types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import axios from "axios";

type Params = {
  id: string | undefined;
}

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
  let params: Params = useParams();

  
  const [user, setUser] = useState<User>(initialValues)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateAccount = () => {
    history.push(`/profile/${params.id}/update`)
  }

  const logout = () => {
    history.push('/login')
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/v1/user/${params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      }
    })
      .then(function (response: any) {
        if (response.status === 200) {
          console.log(response.data)
          setUser(response.data)
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [])

  const deleteAccount = () => {
    axios.delete(`http://localhost:8080/v1/user/${params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      }
    })
      .then(function (response: any) {
        if (response.status === 200) {
          alert("Account deleted successfully!")
          history.push('/login')
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  return (
    <div className="profile" style={{
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'column',
                                    alignItems: 'center', padding: 30
    }}
    >
      <Header title="Profile" />

      <TextInput value={user.name} type="name" id="name" label="Name" disabled={true}/>
        
      <TextInput value={user.email} type="email" id="email" label="Email" disabled={true}/>

      <TextInput value={user.cpf} type="cpf" id="cpf" label="Cpf" disabled={true}/>

      <TextInput value={user.birthDate} type="birthDate" id="birthDate" label="Birth Date" disabled={true}/>

      <TextInput value={user.address} type="address" id="address" label="Address" disabled={true}/>

      <div className="logout" style={{display: 'flex', flex: 1, width: '100%', marginRight: 30, position: 'absolute', justifyContent: 'flex-end'}}> 
        <Button onClick={logout}>Log out</Button>
      </div>

      <div className="buttons" style={{ flexDirection: 'row' }} >
        <Button onClick={updateAccount}>Update Account</Button>

        <Button onClick={handleShow} style={{color: '#F11'}}>Delete Account</Button>
      </div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Did you really want to delete your account?
          </Typography>

          <div className="buttons" style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', marginTop: 15 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteAccount} style={{color: '#F11'}}>Delete Account</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
