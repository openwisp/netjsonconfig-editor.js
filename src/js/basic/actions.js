
const setSchema = schema => {
	return {
		type: "SET_SCHEMA",
		schema
	}
}

const setOnChange = onChange => {
	return {
		type: "SET_ONCHANGE",
		onChange
	}
}

const setBodyKey = time => {
	return {
		type: "SET_BODY_KEY",
		time
	};
}
export {setSchema, setOnChange, setBodyKey};
