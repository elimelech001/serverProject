const http = require("http");
const fs = require("fs");
const isPrime = require("prime-number");
const factorial = require("factorial");
const primeNumber = require("prime-number");
const sendfiles = (req, response, type) => (err, data) => {
  response.writeHead(200, { "content-type": type });
  response.write(data);
  return response.end();
};

const server = http.createServer((request, response) => {
  if (request.url == "/pages") {
    fs.readFile("./pages.html", sendfiles(request, response, "text/html"));
  } else if (request.url == "/pages/about") {
    fs.readFile("./pagesAbout.html", sendfiles(request, response, "text/html"));
  } else if (request.url == "/pages/sports") {
    fs.readFile(
      "./pagesSports.html",
      sendfiles(request, response, "text/html")
    );
  } else if (request.url == "/files") {
    fs.readFile("./files.html", sendfiles(request, response, "text/html"));
  } else if (request.url == "/files/people") {
    fs.readFile(
      "./filesPeople.txt",
      { encoding: "utf8" },
      sendfiles(request, response, "text/txt")
    );
  } else if (request.url == "/files/shops") {
    fs.readFile(
      "./filesShops.txt",
      { encoding: "utf8" },
      sendfiles(request, response, "text/txt")
    );
  } else if (request.url.startsWith("/contacs")) {
    const id = request.url.split("/")[2];
    if (id) {
      fs.readFile("./contacs.json", { encoding: "utf-8" }, (err, data) => {
        const parse = JSON.parse(data);
        const findUser = parse.find((e) => e.id == id);
        if (!findUser) {
          response.statusCode = 404;
          response.write("no such user");
          return response.end();
        }
        response.writeHead(200, { "content-type": "text/json" });
        response.write(JSON.stringify(findUser));
        return response.end();
      });
    } else {
      fs.readFile("./contacs.json", sendfiles(request, response, "text/json"));
    }
  } else if (request.url == "/comps") {
    fs.readFile("./comps.html", sendfiles(request, response, "text/html"));
  } else if (request.url.startsWith("/comps/factiral")) {
    const split = request.url.split("/")[3];

    const factir = factorial(split);
    response.write(`${factir}`);
    response.end();
  } else if (request.url.startsWith("/comps/primes")) {
    const split = request.url.split("/")[3];
    const primes = primeNumber(split);
    response.write(primes ? "prime number" : "not a prime number");
    response.end();
  } else {
    response.statusCode = 404;
    response.write("no such url");
    console.log(request.url);
    return response.end();
  }
});

server.listen(5000, () => console.log("listening"));
