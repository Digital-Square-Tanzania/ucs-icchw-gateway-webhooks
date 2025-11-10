/**
 * @file peers-frontend-controller.js
 * @version 1.0.0
 * @name PeersFrontendController
 * @description This file contains the PeersFrontendController class which handles requests for the peers frontend service.
 * @autor Kizito Mrema
 */

import PeersFrontendService from "../services/peers-frontend-service.js";

/**
 * Class representing the peers frontend controller.
 */
class PeersFrontendController {
  /**
   * Create a PeersFrontendController instance.
   */
  constructor() {
    this.peersFrontendService = new PeersFrontendService();
  }

  /**
   * Handle update test requests.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async updateTest(req, res, next) {
    try {
      await this.peersFrontendService.updateTest(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handle update prod requests.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async updateProd(req, res, next) {
    try {
      await this.peersFrontendService.updateProd(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export default PeersFrontendController;
