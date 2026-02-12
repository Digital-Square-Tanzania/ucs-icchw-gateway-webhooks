/**
 * @file base-service.js
 * @version 1.0.0
 * @name BaseService
 * @description This file contains the BaseService class which provides common methods to handle update operations for both frontend and backend services, including signature verification and command execution.
 * @autor Kizito Mrema
 * @date 2026-02-11
 */

import ErrorHelper from "../helpers/error-helper.js";
import ResponseHelper from "../helpers/response-helper.js";
import VerifySignature from "../helpers/signature-helper.js";
import SpawnCommand from "../helpers/command-helper.js";

/**
 * Class representing the base service.
 */
class BaseService {
  /**
   * Create a BaseService instance.
   */
  constructor() {
    this.errorHelper = new ErrorHelper();
    this.responseHelper = new ResponseHelper();
    this.verifySignature = new VerifySignature();
    this.spawnCommand = new SpawnCommand();
  }

  /**
   * Handle the request to update the environment.
   * Verifies the GitHub webhook signature and triggers the appropriate command if valid.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @param {string} branchEnvVar - The environment variable for the target branch.
   * @param {Array} commandArgs - The arguments for the command to run.
   * @returns {Promise<void>} - A promise that resolves when the update operation is complete.
   */
  async handleUpdate(req, res, next, branchEnvVar, commandArgs) {
    try {
      // 1. Validation Logic
      if (!this.verifySignature.verify(req)) {
        return ResponseHelper.api(req, res, 401, false, "Unauthorized", null);
      }

      const event = req.get("X-GitHub-Event");
      const targetBranch = process.env[branchEnvVar];

      if (event === "push" && req.body.ref === `refs/heads/${targetBranch}`) {
        // 2. Respond to GitHub IMMEDIATELY
        // This prevents the 502 Bad Gateway during self-restart
        ResponseHelper.api(req, res, 202, true, "Deployment initiated", { command: commandArgs[0] });

        // 3. Execute the heavy lifting in a "fire-and-forget" block
        // We do NOT 'await' this, but we MUST catch its internal errors
        this.spawnCommand.run("make", commandArgs, ".", req, null, null).catch((err) => {
          // Since res is already sent, we log the error instead of passing to next()
          console.error(`[DEPLOYMENT ERROR] Failed to run ${commandArgs}:`, err.message);
        });
      } else {
        ResponseHelper.api(req, res, 200, true, "Ignoring non-target event.", null);
      }
    } catch (err) {
      // This catch only triggers if the validation logic above fails
      // BEFORE the response is sent.
      if (!res.headersSent) {
        this.errorHelper.handleError(err, req, res, next);
      } else {
        console.error("[CRITICAL ERROR] Error after response sent:", err);
      }
    }
  }
}

export default BaseService;
