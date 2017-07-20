const schemaReducer = (state = {}, action) => {
  if (action.type == 'SET_SCHEMA') {
    return action.schema;
  }
  return state;
};


const onChangeReducer = (state = () => {}, action) => {
  if (action.type == 'SET_ONCHANGE') {
    return action.onChange;
  }
  return state;
};

const bodyKeyReducer = (state = 'key', action) => {
  if (action.type == 'SET_BODY_KEY') {
    return action.time;
  }
  return state;
};

export {schemaReducer, onChangeReducer, bodyKeyReducer};
