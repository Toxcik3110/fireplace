import React from 'react';

class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="wrapper">
				<div className="left">
					<div className="player" id="player2">
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
						<div className="forces" id="player2">
							<div className="Card">
								
							</div>
						</div>
						<div className="forces" id="player1">
							<div className="Card">
								
							</div>
							<div className="Card">
								
							</div>
						</div>
					</div>
					<div className="player" id="player1">
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
						Player2
					</div>
					<div className="CardDeck">
						
					</div>
					<div className="Turn">
						<button className="Player" id="player1">Your turn</button>
					</div>
					<div className="CardDeck">
						
					</div>
					<div className="Turn">
						Player1
					</div>
				</div>
			</div>
		);
	}
}

export default MainApp;