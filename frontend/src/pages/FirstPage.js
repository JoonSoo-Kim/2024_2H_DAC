import React from "react";
import { AppBar, Toolbar, Grid } from "@mui/material";
import Logo from "../components/Logo";
import Signin from "../components/Signin";
import Description from "../components/Description";

const FirstPage = () => {
  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
      <Grid container>
        <Description />
        <Signin />
      </Grid>
    </div>
  );
};

export default FirstPage;
