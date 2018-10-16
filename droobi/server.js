const express = require("express");
const path = require("path");
const PORT = 8888;

const app = express();

app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.listen(PORT);
console.log("Server running on PORT:", PORT);
















// function _getJson(urlLink, params, fnSuccess, fnError,token) {
// 	$.ajax({
// 			type : "GET",
// 			url : urlLink,
// 			dataType : 'json',
// 			data : params,
// 			headers: {
// 		      		  'authorization': 'Bearer ' + token,
// 		      		  'Access-Control-Allow-Origin': '*'
//     				},
// 			timeout : 100000,
// 	success : function(data) {
// 		if (fnSuccess) {
// 				fnSuccess(data);
// 			}
// 		},
// 	error: function(data) {
// 		if(fnError) {
// 			fnError(data);
// 			}
// 		},
// 	done : function(e) {
// 		}
// 	});
// }


// function _postJson(urlLink, params, fnSuccess, fnError) {
// 	$.ajax({
// 			type : "POST",
// 			contentType : "application/json",
// 			url : urlLink,
// 			dataType : 'json',
// 			data : params,
// 			timeout : 100000,
// 	success : function(data) {
// 		if (fnSuccess) {
// 			fnSuccess(data);
// 		}
// 	},
// 	error : function(data) {
// 		if (fnError) {
// 		fnError(data);
// 		}
// 	},
// 	done : function(e) {
// 		}
// 	});
// }

// function _postJson_withContentType(urlLink, params, fnSuccess, fnError) {
// 	$.ajax({
// 			type : "POST",
// 			contentType : "application/x-www-form-urlencoded",
// 			url : urlLink,
// 			dataType : 'json',
// 			data : params,
// 			timeout : 100000,
// 	success : function(data) {
// 		if (fnSuccess) {
// 			fnSuccess(data);
// 		}
// 	},
// 	error : function(data) {
// 		if (fnError) {
// 		fnError(data);
// 		}
// 	},
// 	done : function(e) {
// 		}
// 	});
// }



// function _patchJson(urlLink, params, fnSuccess, fnError) {
// 	$.ajax({
// 			type : "PATCH",
// 			contentType : "application/json",
// 			url : urlLink,
// 			dataType : 'json',
// 			data : params,
// 			timeout : 100000,
// 	success : function(data) {
// 		if (fnSuccess) {
// 			fnSuccess(data);
// 		}
// 	},
// 	error : function(data) {
// 		if (fnError) {
// 		fnError(data);
// 		}
// 	},
// 	done : function(e) {
// 		}
// 	});
// }


// const getQuestionsList = ({ access_token }) => {
// 	console.log("Token : ",access_token);
	
// 	var url_type="";

// 	$.ajax({
// 	  url: "http://chat.droobihealth.net:8090/v1/api/patients/current/surveys",
// 	  type: 'GET',
	  
// 	  headers: {
// 	  	'Content-Type': 'application/json',
// 	  	'authentication':`Bearer ${access_token}`
// 	  }
// 	});

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
// }	