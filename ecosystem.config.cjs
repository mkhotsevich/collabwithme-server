module.exports = {
  apps: [
    {
      name: 'collabswithme',
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
      host: ['109.70.24.73'],
      ref: 'origin/main',
      repo: 'git@github.com:mkhotsevich/collaber-backend.git',
      path: '/var/www/collabswithme',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.cjs --env production',
    },
    development: {
      user: 'root',
      host: ['109.70.24.73'],
      ref: 'origin/main',
      repo: 'git@github.com:mkhotsevich/collaber-backend.git',
      path: '/var/www/collabswithme',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.cjs --env development',
    },
  },
};
