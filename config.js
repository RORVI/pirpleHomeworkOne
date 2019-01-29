/**
 * This will contain the configuration parameters for the application
 */

var environments = {};

environments.staging = {
    'port': 3000,
    'environment': 'staging'
};

environments.production = {
    'port': 3001,
    'environment': 'production'
};

//determine which environment will be passed via the command line argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

//default to staging if the provided argument is not valid
var environmentToUse = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//expose this module
module.exports = environmentToUse;