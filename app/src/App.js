import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import * as yup from 'yup'
import schema from './Limit'
import Form from './Form'




const initialFormValues = {
  name: '',
  email: '',
  password: '',
  tos: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUsers = []
const initialDisabled = true





export default function App() {
 const [users, setUsers] = useState(initialUsers)
 const [formValues, setFormValues] = useState(initialFormValues)
 const [formErrors, setFormErrors] = useState(initialFormErrors)
 const [disabled, setDisabled] = useState(initialDisabled)


const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
  .then(res => {
    console.log(res.data)
    setUsers([...users, res.data])
    setFormValues(initialFormValues)
  })
  .catch(err => {
    console.log(err)
  })
}

const validate = (name, value) => {
  yup
    .reach(schema, name)
    .validate(value)
    .then(valid => { setFormErrors ({ ...formErrors, [name]: ""}); })
    .catch(err => { setFormErrors ({...formErrors, [name]: err.errors[0] }); });
}

const inputChange = (name, value) => {
  validate(name, value)
  setFormValues({...formValues, [name]: value})
}

const formSubmit = () => {
  const newUser = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    tos: formValues.tos,
  }
  postNewUser(newUser)
}

useEffect(() => {
  schema.isValid(formValues).then(valid => {
    setDisabled(!valid);
  })
},[formValues])

  return (
    <div className="App">
      <h1>User Signup and List</h1>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        />

        {
        users.map((user,index) => {
          return(
            <div key = {index}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
          </div>
          )
        })
        }
    </div>
  );
}

