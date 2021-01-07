import React from "react";
import Layout from "../components/layouts/Layout";
import { Container, Grid } from "@material-ui/core";

const Account = () => {
  return (
    <Layout title="Account">
      <Container maxWidth="lg" component="div">
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <h1>Account</h1>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Account;
