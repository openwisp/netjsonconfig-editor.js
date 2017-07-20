import React from 'react';
import BasicBody from './body';
import PropTypes from 'prop-types';


class App extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			schema: props.schema,
			key: Date.now(),
			data: props.data
		}
	}

	setSchema(schema, data){
		this.setState({
			schema: schema,
			key: Date.now(),
			data: data
		});
	}

	setData(data){
		this.setState({
			data: data
		});
		this.__reInit(data)
	}

	render() {
		return  <div className="basic-editor"> 
					<Header helpText={this.props.helpText}  swapOut={this.props.swapOut} />
					<BasicBody schema={this.state.schema} key={this.state.key} data={this.state.data} ref={ instance => this.__reInit = (data) => instance.reInit(data) } onChange={this.props.onChange}/>
				</div>;
	}
}

const Header = props => {
	return  (<div className="basic-header row">
				<div className="name col-md-4">
					Editor Name Here
				</div>
				<div className="label helpText col-md-6">
					<label className="netjsonconfig-hint" dangerouslySetInnerHTML={{__html: props.helpText}} />
				</div>
				<div className="advanced-button-container col-md-2">
					<button className="advanced-button btn" onClick={ () => { props.swapOut() } }>Advanced Mode</button>
				</div>
			</div>);
}

App.propTypes = {
	schema: PropTypes.object,
	data: PropTypes.object,
	onChange: PropTypes.func,
	helpText: PropTypes.string,
	jsonError: PropTypes.string,
	swapOut: PropTypes.func
};

Header.propTypes = {
	helpText: PropTypes.string,
	swapOut: PropTypes.func
}
export default App;
