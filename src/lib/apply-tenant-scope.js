const { Op } = require('sequelize');
const { getUserId } = require('./tenant-context');

function ensureWhere(options = {}) {
  if (!options.where) options.where = {};
  return options;
}

function addUserFilterToWhere(where = {}, userId) {
  if (!userId) return where; // sem usuário => sem filtro, para não quebrar endpoints públicos
  if (where.userId !== undefined) return where;

  if (Object.keys(where).length > 0) {
    return { [Op.and]: [where, { userId }] };
  }
  return { userId };
}

function applyTenantScope(Model) {
  // Define userId automaticamente ao criar
  Model.addHook('beforeValidate', (instance) => {
    if (instance && instance.isNewRecord && instance.userId == null) {
      const uid = getUserId();
      if (uid != null) instance.userId = uid;
    }
  });

  // Filtra consultas por userId
  Model.addHook('beforeFind', (options = {}) => {
    if (options.skipUserFilter) return;
    const uid = getUserId();
    options = ensureWhere(options);
    options.where = addUserFilterToWhere(options.where, uid);
  });

  // Filtra count
  Model.addHook('beforeCount', (options = {}) => {
    if (options.skipUserFilter) return;
    const uid = getUserId();
    options = ensureWhere(options);
    options.where = addUserFilterToWhere(options.where, uid);
  });

  // Garante filtro também em sum/aggregate
  const origSum = Model.sum.bind(Model);
  Model.sum = (field, options = {}) => {
    if (!options.skipUserFilter) {
      const uid = getUserId();
      options = ensureWhere(options);
      options.where = addUserFilterToWhere(options.where, uid);
    }
    return origSum(field, options);
  };

  if (typeof Model.aggregate === 'function') {
    const origAggregate = Model.aggregate.bind(Model);
    Model.aggregate = (field, aggregateFunction, options = {}) => {
      if (!options.skipUserFilter) {
        const uid = getUserId();
        options = ensureWhere(options);
        options.where = addUserFilterToWhere(options.where, uid);
      }
      return origAggregate(field, aggregateFunction, options);
    };
  }
}

module.exports = { applyTenantScope };
