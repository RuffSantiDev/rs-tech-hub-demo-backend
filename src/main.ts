import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import * as express from "express";
import { AppModule } from "./app/app.module";
const isProduction = process.env.NODE_ENV === "production";
const productionUrl =
  isProduction && process.env.PRODUCTION_URL
    ? process.env.PRODUCTION_URL
    : "http://localhost:3000";

const logLevels: Array<"log" | "error" | "warn" | "debug" | "verbose"> =
  isProduction === true
    ? ["error", "warn", "log"]
    : ["error", "warn", "log", "debug", "verbose"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  app.enableShutdownHooks();
  const logger = new Logger("MAIN");
  logger.log(
    `Application starting in ${
      isProduction ? "production" : "development"
    } mode`
  );
  app.enableCors({
    origin: [
      productionUrl,
      // For your dev frontend server
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });
  app.use(
    "/webhooks/stripe",
    express.raw({
      type: "application/json",
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    })
  );

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      logger.debug(`Incoming ${req.method} request to ${req.url}`);
      next();
    }
  );

  const port = process.env.PORT ?? 4000;
  await app.listen(port, "0.0.0.0");
  logger.log(`RS Tech Hub NestJS Server is running on ${port}`);
}
bootstrap();
