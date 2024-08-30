module.exports = {
  apps: [
    {
      name: "pom-front",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      exec_mode: "cluster",
      instances: "max",
      watch: false,
      output: "./logs/out.log",
      error: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      max_memory_restart: "1G"
    },
  ],
};
