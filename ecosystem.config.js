module.exports = {
  apps: [{
    name: "rimo", 
    script: "./node_modules/next/dist/bin/next",
    args: "start -p 4000", // Thêm port cụ thể
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "500M",
    env: {
      NODE_ENV: "production",
      PORT: 4000
    }
  }]
}