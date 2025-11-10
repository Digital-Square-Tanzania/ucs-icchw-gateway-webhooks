/**
 * @file peers-backend-router.js
 * @version 1.0.0
 * @name PeersBackendRouter
 * @description This file contains the PeersBackendRouter class which handles peers backend-specific routes.
 * @autor Kizito Mrema
 */

import BaseRouter from "./base-router.js";
import PeersBackendController from "../controllers/peers-backend-controller.js";

/**
 * Class representing the peers backend router.
 */
class PeersBackendRouter extends BaseRouter {
  /**
   * Create a PeersBackendRouter instance.
   */
  constructor() {
    super(PeersBackendController);
  }

  /**
   * Initialize the routes for peers backend.
   */
  initializeRoutes() {
    this.router.post("/test", (req, res, next) => this.controller.updateTest(req, res, next));
    this.router.post("/prod", (req, res, next) => this.controller.updateProd(req, res, next));
  }
}

export default PeersBackendRouter;
