import {EMAIL_VALIDATE} from '../actions/common-actions.js'

export default function commonReducer(state=[],{type,payload}) {
	switch(type) {
		case EMAIL_VALIDATE:
			return payload;	
		default: return state;
	}
}
