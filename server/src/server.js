const http = require("http");
const PORT = process.env.PORT || 8000;
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.models");
console.log("PORT = ", PORT);

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
