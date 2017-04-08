const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function(request,response) {
 console.log("URL", request.url);
	generateResponse(request.url).
	then(res => {
		response.setHeader("content-type", res.contentType);
		response.end(res.data);
	}).catch(status => {
		response.statusCode = status;
		response.end();
	});
});


function generateResponse(url) {
   if(url === "/") { url = "/index.html" }
   	console.log(url);

   return new Promise(function(resolve, reject) {
     	fs.readFile(`${__dirname}/public${url}`, "utf8", (err, data) => {
        console.log(`${__dirname}/public${url}`);
       if(err) return reject(404);

       let contentType = null,
        		   ext = path.extname(url);

       switch(ext) {
         case ".html":
           contentType = "text/html";
           break;
         case ".css":
           contentType = "text/css";
           break;
         case ".js":
           contentType = "application/javascript";
           break;
         case ".png":
            contentType = "image/png";
            break;
         default: contentType = "text/html"
      }

       resolve({data, contentType});
     });
  });
}

server.listen(3000);
console.log("server has started");