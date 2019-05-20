import React from "react"
import {
	Paper,
	List,
	ListItem,
	ListItemText,
	Checkbox
} from "@material-ui/core"

const TodoList = props => {
	return (
		<Paper style={{ marginLeft: 1, marginRight: 1, marginTop: 16, padding: 0 }}>
			<List style={{ overflow: "scroll", padding: 0 }}>
				{props.todos.map(todo => (
					<ListItem key={todo.id} divider>
						<Checkbox
							onClick={() => props.clickComplete(todo)}
							color="primary"
							checked={todo.completed === true ? true : false}
							disableRipple
						/>
						{todo.completed == true ? (
							<ListItemText
								disableTypography
								style={{
									fontStyle: "italic",
									fontFamily: "Roboto",
									color: "#BDBDBD",
									textDecoration: "line-through"
								}}
							>
								{todo.text}
							</ListItemText>
						) : (
							<ListItemText>{todo.text}</ListItemText>
						)}
					</ListItem>
				))}
			</List>
		</Paper>
	)
}

export default TodoList
