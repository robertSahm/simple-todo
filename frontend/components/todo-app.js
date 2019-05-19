import React from "react"
import FetchApi from "../fetch-api"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

const ENTER_KEY_CODE = 13

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

  completeTodo = id => {
    FetchApi.put(`/todo/${id}`, { completed: true })
    .then(updateTodos => {
      this.state.todos[id - 1].completed == false ? 
        this.setState({ todos: updateTodos }) 
        : null
    })
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
				<Typography component="h1" variant="h1" align="center" gutterBottom>
					todos
				</Typography>
				<Typography component="h5" variant="h5" align="center" gutterBottom>
					<div>Completed: {this.showCompletedCount()}</div>
					<div>Pending: {this.showPendingCount()}</div>
				</Typography>
				<input
					autoFocus
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					placeholder="What needs to be done?"
					value={this.state.newText}
				/>
				<ul>
					{this.state.todos.map(todo => (
						<li key={todo.id}>
							<label>{todo.text}</label>
							<Button onClick={() => this.completeTodo(todo.id)}>
								Complete
							</Button>
						</li>
					))}
				</ul>
			</div>
		)
	}
}
