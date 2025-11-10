/**
 * @file peers-backend-controller.js
 * @version 1.0.0
 * @name PeersBackendController
 * @description This file contains the PeersBackendController class which handles requests for the peers backend service.
 * @autor Kizito Mrema
 */

import PeersBackendService from "../services/peers-backend-service.js";

/**
 * Class representing the peers backend controller.
 */
class PeersBackendController {
  /**
   * Create a PeersBackendController instance.
   */
  constructor() {
    this.peersBackendService = new PeersBackendService();
  }

  /**
   * Handle update test requests.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async updateTest(req, res, next) {
    try {
      await this.peersBackendService.updateTest(req, res, next);
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
      await this.peersBackendService.updateProd(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export default PeersBackendController;
