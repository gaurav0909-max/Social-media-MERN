import React from "react";
import { Alert } from "@mui/material";

export function MyAlert() {
    const alertStyle = {
      backgroundColor: 'lightblue',
      color: 'white',
      border: '1px solid blue',
    };
  
    return (
      <Alert severity="success" style={alertStyle}>
        This is a custom-styled alert!
      </Alert>
    );
  }
  