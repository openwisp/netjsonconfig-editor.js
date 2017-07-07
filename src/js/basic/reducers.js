
const schemaReducer = (state = {}, action) => {
	if(action.type=="SET_SCHEMA")
		return action.schema;
	else
		return state;
}


const onChangeReducer = (state = ()=>{}, action) => {
	if(action.type == "SET_ONCHANGE"){
		return action.onChange;
	}else
		return state;
}

const bodyKeyReducer = (state = "key", action) => {
	if(action.type == "SET_BODY_KEY")
		return action.time;
	else 
		return state;
}

export {schemaReducer, onChangeReducer, bodyKeyReducer};
