import React from 'react';
import BasicBody from './body';


class App extends React.Component {
	
	constructor(props){
		super(props);
	}

	render() {
	    return  <div className="basic-editor"> 
		    		<Header helpText={this.props.helpText}  swapOut={this.props.swapOut} />
		    		<BasicBody schema={this.props.schema} data={this.props.data} ref={ instance => {this.reInit = (data) => instance.reInit(data); this.setSchema = (data) => instance.setSchema(data); } } onChange={this.props.onChange}/>
	    	    </div>;
	}
}

const Header = props => {
	return  (<div className="basic-header">
				<div className="name">
					Editor Name Here
				</div>
				<div className="label helpText">
					<label className="netjsonconfig-hint" dangerouslySetInnerHTML={{__html: props.helpText}}>
					</label>
				</div>
				<div className="advanced-button-container">
					<button className="advanced-button" onClick={ e => { props.swapOut() } }>Advanced Mode</button>
				</div>
			 </div>);
}
export default App;
