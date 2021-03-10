import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import { Container, Grid, InputAdornment, Button, TextField, CircularProgress } from "@material-ui/core";
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import { setLocal } from '../utils/utils';
import { PATHS } from '../utils/constants';

//Component
import { PasswordIcon, UserIcon } from '../components/Icons/Icons';

//Apollo
import { LOGIN } from '../mutations/login';
import { useMutation } from "@apollo/client";

const Login = () => {
  const route = useRouter()
  const [userInput, setUserInput] = useState({
    clientMutationId: v4(),
    username: '',
    password: ''
  });

  const [Login, { loading, error }] = useMutation(LOGIN, {
    variables: {
      input: userInput
    },
    onCompleted: (data) => {
      console.log("LOGIN SUCCESS");
      if(data.login) {
        setLocal('token', data.login.authToken);
        setLocal('refreshToken', data.login.refreshToken);
        route.push(PATHS.HOME);
      }
    },
    onError: (error) => {
      console.log(`LOGIN FAIL: Error ${error}`);
    },
  });

  const inputHandler = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  };

  const loginHandler = (e) => {
    Login();
    e.preventDefault();
  };

  return (
    <Layout title="Login">
      <Container maxWidth="lg" component="div">
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <img src="/images/banner-login.svg" alt="" />
          </Grid>
          <Grid item lg={4}>
            <h3 className="WelcomeHeading">Login</h3>
            <form className="LoginForm" onSubmit={loginHandler}>
              <TextField
                id="login-user"
                label="User"
                name="username"
                margin="normal"
                value={userInput.username}
                type="text"
                required
                fullWidth
                className="LoginTextField"
                onChange={inputHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="LoginIcon">
                      <UserIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="password"
                label="Password"
                name="password"
                margin="normal"
                value={userInput.password}
                type="password"
                required
                fullWidth
                className="LoginTextField"
                onChange={inputHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="LoginIcon">
                      <PasswordIcon  />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                className="LoginButton"
                fullWidth
                margin="normal"
                variant="outlined"
                type="submit"
              >
                {loading ? <CircularProgress className="LoginSpinner" size={30} /> : "Login"}
              </Button>
              { error ? <p>{ error.message }</p> : null}
            </form>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Login;
