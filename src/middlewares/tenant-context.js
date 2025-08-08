// Use este middleware DEPOIS do authMiddleware (que preenche req.userId).
const { runWithUser } = require('../lib/tenant-context');

module.exports = function tenantContext(req, _res, next) {
  runWithUser(req.userId || null, () => next());
};
