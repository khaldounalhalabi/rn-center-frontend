module.exports = {
  apps: [
    {
      name: "pom-front-dev",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      instances: 2,
      watch: false,
      output: "./../../pom-front-dev-logs/out.log",
      error: "./../../pom-front-dev-logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
