const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const startServer = () => {
  app
    .prepare()
    .then(() => {
      const server = createServer(async (req, res) => {
        try {
          // Be sure to pass `true` as the second argument to `url.parse`.
          // This tells it to parse the query portion of the URL.
          const parsedUrl = parse(req.url, true);
          const { pathname, query } = parsedUrl;

          if (pathname === "/a") {
            await app.render(req, res, "/a", query);
          } else if (pathname === "/b") {
            await app.render(req, res, "/b", query);
          } else {
            await handle(req, res, parsedUrl);
          }
        } catch (err) {
          console.error("Error occurred handling", req.url, err);
          res.statusCode = 500;
          res.end("internal server error");
        }
      });

      server.once("error", (err) => {
        console.error("Server error:", err);
        console.log("Restarting server...");
        server.close(() => {
          startServer(); // Restart the server on error
        });
      });

      server.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
    })
    .catch((err) => {
      console.error("Error during app preparation:", err);
      console.log("Restarting server...");
      startServer(); // Restart the server on app preparation error
    });
};

startServer();
