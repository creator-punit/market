import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import moment from "moment-timezone";

const START_TIME = moment().tz("Asia/Kolkata").format("DD-MMM-YYYY hh:mm:ss a");

console.log(START_TIME);

const swaggerDefinition = {
  info: {
    title: "bAZAAR_api_nodejs",
    version: "2.0.0",
    description: `<h4>Last build: <b>${START_TIME}</b></h4>`,
  },
  servers: [
    {
      url: `http://localhost:8000`,
    },
  ],
};
const option = {
  swaggerDefinition,
  apis: ["./index.js", "./src/routes/*.js", "./src/routes/routes.js"],
};

const swaggerSpec = swaggerJSDoc(option);

export const swagger = (app) => {
  // Url to get API docs: http://{BASE_URL}/api-docs/
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, false, {
      docExpansion: "none",
      tryItOutEnabled: true,
    })
  );
};
