import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Notify from 'notifyjs';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {
	constructor(props) {
		super(props);
		this.myNotification = new Notify('Yo dawg!', {
			body: 'This is an awesome notification',
			notifyShow: this.onNotifyShow.bind(this),
		});
		this.onPermissionGranted = this.onPermissionGranted.bind(this);
		this.onPermissionDenied = this.onPermissionDenied.bind(this);
	}

	onNotifyShow() {
		console.log('notification was shown!');
	}

	onPermissionGranted() {
		console.log('Permission has been granted by the user');
		this.doNotification();
	}

	doNotification() {
		this.myNotification.show();
	}

	onPermissionDenied() {
		console.warn('Permission has been denied by the user');
	}
	componentDidMount() {
		if (!Notify.needsPermission) {
			this.doNotification();
		} else if (Notify.isSupported()) {
			Notify.requestPermission(this.onPermissionGranted, this.onPermissionDenied);
		}
	}

	render() {
		console.log('Host URL' + process.env.PUBLIC_URL);
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Simple React App</h1>
				</header>
				<div style={{ height: 20 }}></div>
				<Button bsStyle="info" onClick={() => this.doNotification()}>
					Click to View Push notification
				</Button>
			</div>
		);
	}
}

export default App;
