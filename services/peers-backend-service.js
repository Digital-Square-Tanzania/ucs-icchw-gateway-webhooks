/**
 * @file peers-backend-service.js
 * @version 1.0.0
 * @name PeersBackendService
 * @description This file contains the PeersBackendService class which handles peers backend update operations.
 * @autor Kizito Mrema
 */

import BaseService from "./base-service.js";

/**
 * Class representing the backend service.
 */
class PeersBackendService extends BaseService {
  /**
   * Handle the request to update the test environment.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the update operation is complete.
   */
  async updateTest(req, res, next) {
    await this.handleUpdate(req, res, next, "PEERS_BACKEND_TEST_BRANCH", ["deployPeersTestBackend"]);
  }

  /**
   * Handle the request to update the production environment.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the update operation is complete.
   */
  async updateProd(req, res, next) {
    await this.handleUpdate(req, res, next, "PEERS_BACKEND_PROD_BRANCH", ["deployPeersProdBackend"]);
  }
}

export default PeersBackendService;
