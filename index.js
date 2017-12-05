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
						do{
							let value = aFormData[1];
							let arr = value.match(/name=\"(.+)\";\sfilename=\"(.+)\"$/);
							if(arr && arr.length){
								obj[arr[1]] = aFormData[4];
								aFormData.splice(0, 5);
								continue;
							}else{
								arr = value.match(/name=\"(.+)\"$/);
								if(arr && arr.length){
									obj[arr[1]] = aFormData[3];
									aFormData.splice(0, 4);
									continue;
								}
							}
							aFormData.splice(0, 4);
						}while(aFormData.length);
					
						resolve(obj);
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



