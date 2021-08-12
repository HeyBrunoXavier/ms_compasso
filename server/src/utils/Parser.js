class Parser {
	
	ParserDate(date){
		let regEx = /^\d{4}-\d{2}-\d{2}$/;
		if(!date.match(regEx)) return false;  // Invalid format
		let d = new Date(date);
		let dNum = d.getTime();
		if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
		let st_date = d.toISOString().slice(0,10);
		return st_date;
	}
	
}

module.exports =  new Parser();