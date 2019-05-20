import React from "react"
import {
	Grid,
	Typography,
	AppBar,
	Toolbar, 
} from "@material-ui/core"

const barStyle = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
}

const TodoToolbar = props => {
	return (
		<AppBar style={barStyle} position="static">
			<Toolbar>
				<Grid container justify="space-between" spacing={8}>
					<Grid xs={6} sm={8} item>
						<Typography variant="h6" color="inherit">
							TODO APP
						</Typography>
					</Grid>
					<Grid xs={3} sm={2} item>
						<Typography variant="overline" align="right" color="inherit">
							Completed: {props.showCompletedCount()}
						</Typography>
					</Grid>
					<Grid xs={3} sm={2} item>
						<Typography variant="overline" align="right" color="inherit">
							Pending: {props.showPendingCount()}
						</Typography>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default TodoToolbar
