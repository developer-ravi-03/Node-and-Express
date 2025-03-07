const express = require("express");

//local module
const path = require("path");
const rootDir = require("./utils/pathutils");
const homeRoutes = require("./routes/homeRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(express.urlencoded());

app.use(homeRoutes);

app.use(contactRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
