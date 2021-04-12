import React , { useReducer, useState } from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

const initialFormState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  errors: [],
  loading: false,
  };

const formReducer = (state, action) => {
  switch(action.type) {
    case "HANDLE_INPUT_STATE":
      return {
        ...state,
        [action.field]: action.payload,
      }
    case "HANDLE_INPUT_STATE_ERROR":
      return {
        ...state,
        errors: state.errors.concat(action.payload),
      }
      case "HANDLE_INPUT_STATE_ERROR_RESET":
      return {
        ...state,
        errors: [],
      }
      case "LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state;
  }
}

const Register = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [userRef, setUserRef] = useState(firebase.database().ref("users"));

  const isFormValid = () => {
    if(isFormEmpty(formState)) {
      dispatch({
        type: "HANDLE_INPUT_STATE_ERROR",
        payload: "Fill in all fields",
      })
      return false;
    } else if (isPasswordValid(formState)) {
      dispatch({
        type: "HANDLE_INPUT_STATE_ERROR",
        payload: "Password is invalid",
      })
    } else {
      return true;
    }
  }

  const isFormEmpty = ({username, email, password, passwordConfirmation} ) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  }

  const isPasswordValid = ({password,passwordConfirmation}) => {
    if(password.length < 6 || passwordConfirmation < 6) {
      return true;
    } else if( password !== passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (e) => {
    dispatch({
      type: "HANDLE_INPUT_STATE",
      field: e.target.name,
      payload: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isFormValid()) {
      dispatch({
        type: "HANDLE_INPUT_STATE_ERROR_RESET",
      })
      dispatch({
        type: "LOADING",
        payload: true,
      })
      firebase
        .auth()
        .createUserWithEmailAndPassword(formState.email, formState.password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: formState.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(()=>{
              saveUser(createdUser).then(() => {
                console.log("user saved");
              });
              dispatch({
                type: "LOADING",
                payload: false,
              })
              dispatch({
                type: "HANDLE_INPUT_STATE_ERROR_RESET",
              })
            })
            .catch(err => {
              console.error(err);
              dispatch({
                type: "HANDLE_INPUT_STATE_ERROR",
                payload: err.message,
              })
            })
          })
        .catch(err => {
          console.error(err)
          dispatch({
            type: "LOADING",
            payload: false,
          })
          dispatch({
            type: "HANDLE_INPUT_STATE_ERROR",
            payload: err.message,
          })
        }) 
    }
  }

  const saveUser = (createdUser) => {
    console.log('userRef', userRef)
    return userRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
      })
  }

  const displayErrors = errors => formState.errors.map((error,i)=> <p key={i}>{error}</p>)

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
             Register for DevChat
          </Header>
          <Form size="large" onSubmit={handleSubmit} >
            <Segment>
              <Form.Input fluid value={formState.username} name="username" icon="user" iconPosition="left" placeholder="username" onChange={handleChange} type="text"/>

              <Form.Input fluid value={formState.email} name="email" icon="mail" iconPosition="left" placeholder="emial" onChange={handleChange} type="emial"/>

              <Form.Input fluid value={formState.password} name="password" icon="lock" iconPosition="left" placeholder="password" onChange={handleChange} type="password"/>

              <Form.Input fluid value={formState.passwordConfirmation} name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={handleChange} type="password"/>

              <Button disabled={formState.loading } className={formState.loading ? 'loading' : ''} color="orange" fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {formState.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {displayErrors()}
            </Message>
          )}
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    ) 
}

export default Register;