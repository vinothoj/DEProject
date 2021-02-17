import {UPDATE_USER} from '../actions/user-actions.js'

export default function userreducer(state='userState',{type,payload}) {
	switch(type) {
		case UPDATE_USER:
			return payload;	
		default: return state;
	}
}
