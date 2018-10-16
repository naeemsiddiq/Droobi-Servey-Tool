function _getJson(urlLink, params, fnSuccess, fnError,token) {
	$.ajax({
			type : "GET",
			url : urlLink,
			dataType : 'json',
			data : params,
			headers: {
		      		  'authorization': 'Bearer ' + token,
		      		  'Access-Control-Allow-Origin': '*'
    				},
			timeout : 100000,
	success : function(data) {
		if (fnSuccess) {
				fnSuccess(data);
			}
		},
	error: function(data) {
		if(fnError) {
			fnError(data);
			}
		},
	done : function(e) {
		}
	});
}


function _postJson(urlLink, params, fnSuccess, fnError) {
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : urlLink,
			dataType : 'json',
			data : params,
			timeout : 100000,
	success : function(data) {
		if (fnSuccess) {
			fnSuccess(data);
		}
	},
	error : function(data) {
		if (fnError) {
		fnError(data);
		}
	},
	done : function(e) {
		}
	});
}

function _postJson_withContentType(urlLink, params, fnSuccess, fnError) {
	$.ajax({
			type : "POST",
			contentType : "application/x-www-form-urlencoded",
			url : urlLink,
			dataType : 'json',
			data : params,
			timeout : 100000,
	success : function(data) {
		if (fnSuccess) {
			fnSuccess(data);
		}
	},
	error : function(data) {
		if (fnError) {
		fnError(data);
		}
	},
	done : function(e) {
		}
	});
}



function _patchJson(urlLink, params, fnSuccess, fnError) {
	$.ajax({
			type : "PATCH",
			contentType : "application/json",
			url : urlLink,
			dataType : 'json',
			data : params,
			timeout : 100000,
	success : function(data) {
		if (fnSuccess) {
			fnSuccess(data);
		}
	},
	error : function(data) {
		if (fnError) {
		fnError(data);
		}
	},
	done : function(e) {
		}
	});
}


const getQuestionsList = ({ access_token }) => {
	console.log("Token : ",`Bearer ${access_token}`);
	
	var url_type="";

	$.ajax({
	  type: 'GET',
	  url: "http://chat.droobihealth.net:8090/v1/api/patients/current/surveys",
	  beforeSend: function(xhr){
	  	xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
	  	xhr.setRequestHeader('Content-Type', 'application/json');
	 }
	  	
	});


















	// $.ajax({
	// 	url: 'http://chat.droobihealth.net:8090/v1/api/patients/current/surveys',
	//     type: 'GET',
	//     xhrFields: {
	//         withCredentials: true
	//     },
	//     crossDomain: true,
	//     headers: {
	//     	'accept': 'application/json',
	//     	'Content-Type': 'application/json',
	//     	Authorization: `Bearer ${access_token}`,
	//     },
	//     dataType: 'json', 
	//     success: function (response) {
	//         console.log('YES');
	//     },
	//     error: function (xhr, status) {
	//         console.log('Status Code: ', status);
	//         console.log('Error Response: ', xhr);
	//     }
	// });
}	