module.exports = {
  apps: [
    {
      name: 'collabwithme-server',
      script: './dist/main.js',
      watch: false,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: ['194.67.108.135'],
      ref: 'origin/main',
      repo: 'git@github.com:mkhotsevich/collabwithme-server.git',
      path: '/var/www/collabwithme.ru-server',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.cjs --env production',
    }
  },
};
