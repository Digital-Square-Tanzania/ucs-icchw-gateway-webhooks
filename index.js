/**
 * @file server.js
 * @version 1.0.0
 * @name Server
 * @description This file is the entry point for the Express server application. It sets up middleware, routing, and error handling.
 * @autor Kizito Mrema
 */

import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });
import bodyParser from "body-parser";
import os from "os";

import ErrorHelper from "./helpers/error-helper.js";
import BackendRouter from "./routes/backend-router.js";
import FrontendRouter from "./routes/frontend-router.js";
import WebhooksRouter from "./routes/webhooks-router.js";
import PeersBackendRouter from "./routes/peers-backend-router.js";
import PeersFrontendRouter from "./routes/peers-frontend-router.js";

/**
 * Class representing the server.
 */
class Server {
  /**
   * Create a Server instance.
   */
  constructor() {
    this.app = express();
    this.port = process.env.NODE_PORT || 3011;
    this.initializeMiddleware();
    this.initializeErrorHandling();
    this.initializeRouteHandling();
  }

  /**
   * Initialize middleware for the Express app.
   */
  initializeMiddleware() {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  /**
   * Initialize error handling for the Express app.
   */
  initializeErrorHandling() {
    const errorHelperInstance = new ErrorHelper();
    this.app.use((err, req, res, next) => {
      errorHelperInstance.handleError(err, req, res, next);
    });
  }

  /**
   * Initialize route handling for the Express app.
   */
  initializeRouteHandling() {
    // API V1 Health Check Route
    this.app.get("/api/v1/health", (req, res) => {
      const uptimeSeconds = process.uptime();

      // Calculate uptime in a readable format
      const days = Math.floor(uptimeSeconds / (24 * 3600));
      const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((uptimeSeconds % 3600) / 60);
      const seconds = Math.floor(uptimeSeconds % 60);

      const healthData = {
        status: "UP",
        service: process.env.SERVICE_NAME || "Gateway Webhooks Service",
        timestamp: new Date().toISOString(),
        details: {
          uptime: `${days}d ${hours}h ${minutes}m ${seconds}s`,
          process: {
            pid: process.pid,
            memoryUsage: {
              rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
              heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
              heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
            },
            nodeVersion: process.version,
          },
          system: {
            platform: process.platform,
            loadAverage: os.loadavg(), // Returns 1, 5, and 15 minute load averages
            freeMemory: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
            totalMemory: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
          },
          environment: {
            nodeEnv: process.env.NODE_ENV || "development",
            port: this.port,
          },
        },
      };

      // Optional: Add logic to change status to "DEGRADED" if memory is too high
      const memoryThreshold = 0.9; // 90%
      if (os.freemem() / os.totalmem() < 1 - memoryThreshold) {
        healthData.status = "DEGRADED";
        healthData.message = "System memory is running critically low.";
      }

      res.status(healthData.status === "UP" ? 200 : 503).json(healthData);
    });

    // API V1 Routes
    const backendRouter = new BackendRouter();
    const frontendRouter = new FrontendRouter();
    const webhooksRouter = new WebhooksRouter();
    const peersBackendRouter = new PeersBackendRouter();
    const peersFrontendRouter = new PeersFrontendRouter();

    this.app.use("/api/v1/webhooks/icchw/backend", backendRouter.getRouter());
    this.app.use("/api/v1/webhooks/icchw/frontend", frontendRouter.getRouter());
    this.app.use("/api/v1/webhooks/icchw/webhooks", webhooksRouter.getRouter());
    this.app.use("/api/v1/peers/backend", peersBackendRouter.getRouter());
    this.app.use("/api/v1/peers/frontend", peersFrontendRouter.getRouter());
  }

  /**
   * Start the Express server.
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`INFO: Service ${process.env.SERVICE_NAME?.toUpperCase()} is listening on ${this.port}`);
    });
  }
}

export default Server;

const server = new Server();
server.start();
