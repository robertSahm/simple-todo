import React from "react"
import FetchApi from "../fetch-api"
import {
	TextField,
	Checkbox,
	Paper,
	Button,
	Grid,
	List,
	Typography,
	AppBar,
	Toolbar, 
  ListItem,
  ListItemText,
} from "@material-ui/core"
import Input from '../components/todo-input'

const ENTER_KEY_CODE = 13

const addButton = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
}

export default class TodoApp extends React.Component {
	state = { todos: [], newText: "" }
	constructor(props) {
		super(props)
		this.getTodos()
	}

	getTodos = () => {
		return FetchApi.get("/todo")
			.then(todos => this.setState({ todos }))
			.catch(() => alert("There was an error getting todos"))
	}

	createTodo = () => {
		FetchApi.post("/todo", { text: this.state.newText, completed: false })
			.then(newTodo => {
				const newTodos = Array.from(this.state.todos)
				newTodos.push(newTodo)
				this.setState({ todos: newTodos, newText: "" })
			})
			.catch(() => alert("There was an error creating the todo"))
	}

	handleDeleteRequest = id => {
		FetchApi.delete(`/todo/${id}`)
			.then(() => {
				const newTodos = Array.from(this.state.todos)
				const todoIndex = newTodos.findIndex(
					todo => todo.id.toString() === id.toString()
				)
				newTodos.splice(todoIndex, 1)
				this.setState({ todos: newTodos })
			})
			.catch(() => alert("Error removing todo"))
	}

  clickComplete = todo => {
    if (todo.completed == true)
			FetchApi.put(`/todo/${todo.id}`, { completed: false }).then(
				updateTodos => {
					this.setState({ todos: updateTodos })
				}
			)
		else
			FetchApi.put(`/todo/${todo.id}`, { completed: true }).then(
				updateTodos => {
					this.state.todos[todo.id - 1].completed === false
						? this.setState({ todos: updateTodos })
						: null
				}
			)
  }

	handleChange = e => {
		this.setState({ newText: e.target.value })
	}

	handleKeyDown = e => {
		if (e.keyCode !== ENTER_KEY_CODE) return
		this.createTodo()
	}

  showPendingCount = () => {
    let pending = this.state.todos.filter(i => {
      return i.completed == false
    })
    return pending.length
  }

  showCompletedCount = () => {
    let completed = this.state.todos.filter(i => {
      return i.completed == true
    })
    return completed.length
  }

	render() {
		return (
			<div>
				<AppBar color="primary" position="static">
					<Toolbar>
            <Grid
              container 
              justify="space-between"
              spacing={8}
            >
              <Grid xs={6} sm={8} item>
                <Typography variant="h6" color="inherit">
                  TODO APP
                </Typography>
              </Grid>
              <Grid xs={3} sm={2} item>
                <Typography variant="overline" align="right" color="inherit">
                  Completed: {this.showCompletedCount()}
                </Typography>
              </Grid>
              <Grid xs={3} sm={2} item>
                <Typography variant="overline" align="right" color="inherit">
                  Pending: {this.showPendingCount()}
                </Typography>
              </Grid>
            </Grid>
					</Toolbar>
				</AppBar>

				<Paper style={{ marginLeft: 1, marginRight: 1, marginTop: 16, padding: 16 }}>
					<Grid container alignItems="center">
						<Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
							<TextField
								autoFocus
								fullWidth
								onChange={this.handleChange}
								onKeyDown={this.handleKeyDown}
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

        <Paper style={{ marginLeft: 1, marginRight: 1, marginTop: 16, padding: 0 }}>
          <List style={{ overflow: "scroll", padding: 0 }}>
            {this.state.todos.map(todo => (
              <ListItem key={todo.id} divider>
                <Checkbox
                  onClick={() => this.clickComplete(todo)}
                  color="primary"
                  checked={todo.completed === true ? true : false}
                />
                <ListItemText>{todo.text}</ListItemText>
              </ListItem>
            ))}
          </List>

        </Paper>
			</div>
		)
	}
}
