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
      instances: 4,
      watch: true,
    },
  ],
};
