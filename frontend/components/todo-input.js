import React, { memo } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

const handleChange = e => {
	this.setState({ newText: e.target.value })
}

const handleKeyDown = e => {
	if (e.keyCode !== ENTER_KEY_CODE) return
	this.createTodo()
}

const Input = () => {
  <Paper style={{ marginLeft: 1, marginRight: 1, marginTop: 16, padding: 16 }}>
    <Grid container alignItems="center">
      <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          autoFocus
          fullWidth
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={this.state.newText}
          align="center"
          label="Enter todo item"
        />
      </Grid>
      <Grid xs={2} md={1} item>
        <Button
          fullWidth
          style={addButton}
          color="inherit"
          onClick={this.createTodo}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  </Paper>
};

export default Input