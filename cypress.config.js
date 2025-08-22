const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'Pub-Email-Test/cypress/e2e/**/*.{cy.js,cy.jsx,cy.ts,cy.tsx}',
    supportFile: 'cypress/support/commands.js',

    defaultCommandTimeout: 10000,
    responseTimeout: 30000,
    requestTimeout: 30000,

    setupNodeEvents(on, config) {

      const environments = {
        dev: {
          baseUrl: 'https://dev.apexnetwork.com',
          env: {
            sendEmail: '/send-email'
          }
        },

      };

      const env = process.env.ENV || 'dev';
      const envConfig = environments[env];

      if (!envConfig) {
        throw new Error(`Invalid environment: ${env}`);
      }

      // merge baseUrl + env vars
      return {
        ...config,
        baseUrl: envConfig.baseUrl,
        env: {
          ...config.env,
          ...envConfig.env
        }
      };
    }
  },
  video: false,
  screenshotOnRunFailure: true
});
