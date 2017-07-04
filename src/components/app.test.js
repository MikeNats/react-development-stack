import React from 'react';
import App from './app'
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

describe('Welcome (Snapshot)', () => {
	let div ;

	beforeEach(() => {
		div = document.createElement("div");
		div.id = 'react-container';
		document.body.appendChild(div)
	});
	afterEach(() => {
		div.remove();
	});

	it('Welcome renders hello world', () => {
		console.log(document.getElementById("react-container"));
		const component = renderer.create(<App />);
		const json = component.toJSON();
		expect(json).toMatchSnapshot();
	});
});