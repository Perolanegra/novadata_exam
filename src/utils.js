const fs = require("fs");
const path = require("path");

const assignEnvVarsToNode = () => {
  const envPath = path.join(__dirname, "../.env");
  const envFile = fs.readFileSync(envPath, "utf8");

  // Parse the contents into key-value pairs
  const envVariables = envFile
    .split("\n")
    .filter((line) => line.trim() !== "")
    .reduce((acc, line) => {
      const [key, value] = line.split("=");
      acc[key.trim()] = value.trim();
      return acc;
    }, {});

  Object.assign(process.env, envVariables);
};

module.exports = assignEnvVarsToNode;