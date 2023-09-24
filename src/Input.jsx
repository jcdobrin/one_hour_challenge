import { useContext } from 'react';
import UserContext from "./UserContext";


function InputChanged(e, user, index, dispatch) {
	user = recChange(user, index, e.target.value);
	dispatch({ type: "user_changed", user });
}

function recChange(obj, index, value) {
	for(var k of Object.keys(obj)) {
		if( typeof obj[k] === 'object') {
			let o = {...obj};
			let n = recChange({...o[k]}, index, value);
			o[k] = {...n};
			obj = o;
		} else if(k === index) {
			obj[k] = value;
			return obj;
		}
	}
	return obj;
}

function recValue(obj, index) {
	for(var k of Object.keys(obj)) {
		if( typeof obj[k] === 'object') {
			let value = recValue(obj[k], index);
			if(value) return value;
		} else if(k === index) {
			return obj[k]
		}
	}
	return '';
}

const Input = ({user, index}) => {
	const {dispatch} = useContext(UserContext);
	let value = ''+recValue(user, index);
	return (
		<input size={value.length+1} value={value} onChange={(e) => InputChanged(e, user, index, dispatch)}/>
	);
}

export default Input