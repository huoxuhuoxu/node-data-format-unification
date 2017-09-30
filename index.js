/*
 * unification format data
 * 	handler:
 *		1. application/json
 *		2. application/x-www-form-urlencoded
 *		3. multipart/form-data
 *	
 *	result:
 *		req.body
*/

const unification_format_data = async function(req, res, next){
	let method = req.method;
	if(method.toLowerCase() !== 'get'){
		let ContentType = req.headers['content-type'];
		if(/multipart\/form\-data/.test(ContentType)){
			let arr = [];		
			req.body = await new Promise(resolve => {
				req.on('data', chunk => {
					arr.push(chunk);
				});
				req.on('end', () => {
					let s = arr.toString();
					let aFormData = s.split('\r\n');
					if(aFormData.length > 1){
						let obj = {};
						for(let i=0; i<aFormData.length - 4; i+=4){
							let sKey = aFormData[i+1];
							let sValue = aFormData[i+3];
							sKey = sKey.match(/name=\"(.+)\"$/)[1];
							obj[sKey] = sValue;
						}
						resolve(obj);
						return ;
					}
					resolve({});
				});
			});
		}
	}else{
		if(JSON.stringify(req.body) === "{}"){
			req.body = req.query;
		}
	}
	next();
};

module.exports = function(){
	return unification_format_data;
};



