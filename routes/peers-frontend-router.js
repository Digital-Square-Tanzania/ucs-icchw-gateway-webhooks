/**
 * @file peers-frontend-router.js
 * @version 1.0.0
 * @name PeersFrontendRouter
 * @description This file contains the PeersFrontendRouter class which handles peers frontend-specific routes.
 * @autor Kizito Mrema
 */

import BaseRouter from "./base-router.js";
import PeersFrontendController from "../controllers/peers-frontend-controller.js";

/**
 * Class representing the peers frontend router.
 */
class PeersFrontendRouter extends BaseRouter {
  /**
   * Create a PeersFrontendRouter instance.
   */
  constructor() {
    super(PeersFrontendController);
  }

  /**
   * Initialize the routes for peers frontend.
   */
  initializeRoutes() {
    this.router.post("/test", (req, res, next) => this.controller.updateTest(req, res, next));
    this.router.post("/prod", (req, res, next) => this.controller.updateProd(req, res, next));
  }
}

export default PeersFrontendRouter;
