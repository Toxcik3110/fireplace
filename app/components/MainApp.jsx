import React from 'react';

class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}

				// <h1 className='page-title'>Todo App</h1>
				// <div className="grid-x grid-margin-x">
				// 	<div className="auto cell"></div>
				// 	<div className="medium-6 large-4 cell container">
				// 		<TodoSearch />
				// 		<TodoList />
				// 		<AddTodo />
				// 	</div>
				// 	<div className="auto cell"></div>
				// </div>
				// <h1 class='page-title'>{'Fireplace'.toUpperCase()}</h1>
	render() {
		return (
			<div className="wrapper">
				<div className="left">
					<div className="player2">
						<div className="Hand">
							<div className="Card">
								
							</div>
							<div className="Card">
								
							</div>
							<div className="Card">
								
							</div>
						</div>
						<div className="ManaHp">
							<div className="hp">
								<div className="alert progress">
									<div className="progress-meter" style={{width: "50%"}}>10/20</div>
								</div>
							</div>
							<div className="mana">
								<div className="progress">
									<div className="progress-meter" style={{width:'0%'}}>0/9</div>
								</div>
							</div>
						</div>
					</div>
					<div className="field">
						<div className="forces2">
							
						</div>
						<div className="forces1">
							
						</div>
					</div>
					<div className="player1">
						<div className="Hand">
							<div className="Card">
								
							</div>
							<div className="Card">
								
							</div>
							<div className="Card">
								
							</div>
						</div>
						<div className="ManaHp">
							<div className="hp">
								<div className="alert progress">
									<div className="progress-meter" style={{width: "75%"}}>15/20</div>
								</div>
							</div>
							<div className="mana">
								<div className="progress">
									<div className="progress-meter" style={{width:'50%'}}>5/10</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="Turn">
					
					</div>
					<div className="CardDeck">
						
					</div>
					<div className="Turn">
						<button className="Player">Your turn</button>
					</div>
					<div className="CardDeck">
						
					</div>
					<div className="Turn">
					</div>
				</div>
			</div>
		);
	}
}

export default MainApp;