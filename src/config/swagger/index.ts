import swaggerUI from "swagger-ui-express";
import SwaggerConfig from "./SwaggerConfig";

const server = swaggerUI.serve;

const setup = swaggerUI.setup(SwaggerConfig);

export { server, setup };
