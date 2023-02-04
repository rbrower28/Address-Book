const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Address Book',
    description: 'Manage Addresses',
  },
  host: 'addressbook-iyzx.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);