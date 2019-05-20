import React from "react"
import FetchApi from "../fetch-api"
import { Grid, Typography, AppBar, Toolbar } from "@material-ui/core"
import TodoToolbar from "../components/todo-toolbar"
import Input from "../components/todo-input"
import TodoList from "../components/todo-list"

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

	createTodo = () => {
		FetchApi.post("/todo", { text: this.state.newText, completed: false })
			.then(newTodo => {
				const newTodos = Array.from(this.state.todos)
				newTodos.push(newTodo)
				this.setState({ todos: newTodos, newText: "" })
			})
			.catch(() => alert("There was an error creating the todo"))
	}

	clickComplete = todo => {
		if (todo.completed == true)
			FetchApi.put(`/todo/${todo.id}`, { completed: false }).then(
				updateTodos => {
					this.setState({ todos: updateTodos })
				}
			)
		else if (todo.completed == false)
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

	render() {
		return (
			<div>
				<TodoToolbar
					showCompletedCount={this.showCompletedCount}
					showPendingCount={this.showPendingCount}
				/>
				<Input
					handleChange={this.handleChange}
					handleKeyDown={this.handleKeyDown}
					createTodo={this.createTodo}
					newText={this.state.newText}
				/>
				<TodoList todos={this.state.todos} clickComplete={this.clickComplete} />
			</div>
		)
	}
}
