module.exports = {
  apps: [
    {
      name: "pom-front",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "dev",
      },
      instances: 2,
      watch: false,
      output: "./../../pom-front-logs/out.log",
      error: "./../../pom-front-logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
