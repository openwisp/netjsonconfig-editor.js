const setSchema = (schema) => ({
  type: 'SET_SCHEMA',
  schema,
});

const setOnChange = (onChange) => ({
  type: 'SET_ONCHANGE',
  onChange,
});

const setBodyKey = (time) => ({
  type: 'SET_BODY_KEY',
  time,
});
export {setSchema, setOnChange, setBodyKey};
