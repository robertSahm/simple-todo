import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

const addButton = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
}

const Input = props => {
  return (
    <Paper style={{ marginLeft: 1, marginRight: 1, marginTop: 16, padding: 16 }}>
      <Grid container alignItems="center">
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            autoFocus
            fullWidth
            onChange={props.handleChange}
            onKeyDown={props.handleKeyDown}
            value={props.newText}
            align="center"
            label="Enter todo item"
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            style={addButton}
            color="inherit"
            onClick={props.createTodo}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>

  )
};

export default Input