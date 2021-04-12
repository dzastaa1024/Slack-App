import React , { useReducer, useState } from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

const initialFormState = {
  email: "",
  password: "",
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

const Login = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e) => {
    dispatch({
      type: "HANDLE_INPUT_STATE",
      field: e.target.name,
      payload: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isFormValid(formState)) {
      console.log("------")
      dispatch({
        type: "LOADING",
        payload: true,
      })
      dispatch({
        type: "HANDLE_INPUT_STATE_ERROR_RESET",
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(formState.email, formState.password)
      .then(signedInUser => {
        console.log("signedInUser", signedInUser)
      })
      .catch(err => {
        console.log("err", err)
        dispatch({
          type: "HANDLE_INPUT_STATE_ERROR",
          payload: err.message,
        })
        dispatch({
          type: "LOADING",
          payload: false,
        })
      })
     }
  }

  const isFormValid = ({email, password}) => email && password;

  const displayErrors = errors => formState.errors.map((error,i)=> <p key={i}>{error}</p>)

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet"/>
             Login to DevChat
          </Header>
          <Form size="large" onSubmit={handleSubmit} >
            <Segment>

              <Form.Input fluid value={formState.email} name="email" icon="mail" iconPosition="left" placeholder="emial" onChange={handleChange} type="emial"/>

              <Form.Input fluid value={formState.password} name="password" icon="lock" iconPosition="left" placeholder="password" onChange={handleChange} type="password"/>

              <Button disabled={formState.loading } className={formState.loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {formState.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {displayErrors()}
            </Message>
          )}
          <Message>Don't have an account? <Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
    ) 
}

export default Login;