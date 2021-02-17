export default function productreducer(state='',{type,payload}) {
	if(type==='changetype')
		return payload;
	return state;
}

