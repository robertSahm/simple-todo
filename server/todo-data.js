let todosCreated = 1
let todos = [
	{
		id: 1,
    completed: false,
		text: "Finish coding exercise"
	}
]

export default class TodoData {
	static create(todo) {
		return new Promise(resolve => {
			todo.id = ++todosCreated
			todos.push(todo)
			resolve(todo)
		})
	}

	static findAll() {
		return new Promise(resolve => resolve(todos))
	}

	static delete(id) {
		return new Promise((resolve, reject) => {
			const todoIndex = todos.findIndex(
				todo => todo.id.toString() === id.toString()
			)
			if (todoIndex < 0 || todoIndex >= todos.length) return reject()
			todos.splice(todoIndex, 1)
			resolve()
		})
	}

	static setComplete(id, completed) {
		return new Promise((resolve, reject) => {
      const todoIndex = todos.findIndex(
				todo => Number(todo.id) === Number(id)
			)
      todos[todoIndex].completed = true
      resolve(todos)
		})
	}
}
