var optimizeCb = function (func, context, argCount) {
  if (context === void 0) {
    return func;
  }
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    case 2:
      return function (value, other) {
        return func.call(context, value, other);
      };
    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };
    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }
  return function () {
    return func.apply(context, arguments);
  };
};

var cb = function (value, context, argCount) {
  if (value == null) {
    return AV._.identity;
  }
  if (AV._.isFunction(value)) {
    return optimizeCb(value, context, argCount);
  }
  if (AV._.isObject(value)) {
    return AV._.matcher(value);
  }
  return AV._.property(value);
};

AV._.mapObject = function (obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var keys = AV._.keys(obj),
    length = keys.length,
    results = {},
    currentKey;
  for (var index = 0; index < length; index++) {
    currentKey = keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};

function D(model) {
  var Model = AV.Object.extend(model);
  var instance = new Model();
  var q = new AV.Query(Model);

  return {
    field: function (field, revers) {

    },

    table: function (table, hasPrefix) {

    },

    limit: function (offset, length) {

    },

    page: function (page, listRows) {
      q.skip((page - 1) * listRows);
      q.limit(listRows);

      return this;
    },

    union: function (union, all) {

    },

    join: function (join) {

    },

    order: function (order) {
      var _order = order.split(' ');
      if (_order.length === 1) {
        q.ascending(order);
      } else if (_order.length === 2) {
        if (_order[1].toLowerCase() === 'desc') {
          q.descending(_order[0]);
        } else {
          q.ascending(_order[0]);
        }
      }

      return this;
    },

    alias: function (alias) {

    },

    having: function (str) {

    },

    group: function (field) {

    },

    distinct: function (field) {

    },

    where: function (where) {
      AV._.mapObject(where, function (val, key) {
        if (typeof val === 'string' || typeof val === 'number') {
          q.equalTo(key, val);
        } else {
          if (val[0] === '!=') {
            q.notEqualTo(key, val[1]);
          }
        }
      });

      return this;
    },

    count: function (field) {
      return q.count();
    },

    sum: function (field) {

    },

    min: function (field) {

    },

    max: function (field) {

    },

    avg: function (field) {

    },

    add: function (data, ACL) {
      AV._.mapObject(data, function (val, key) {
        instance.set(key, val);
      });

      if (ACL) {
        instance.setACL(ACL);
      }

      return instance.save();
    },

    thenAdd: function (data, where, returnDetail) {

    },

    addAll: function (data) {

    },

    delete: function () {
      return q.destroyAll();
    },

    update: function (data) {

    },

    select: function () {
      return q.find();
    },

    find: function () {

    },

    updateInc: function (field, step) {

    },

    updateDec: function (field, step) {

    },

    getField: function (field, onlyOne) {

    },

    //todo: 暂未实现
    countSelect: function (options, flag) {
      var result = {};
      return q.find()
        .then(function(res) {
          result.results = res;
        })
        .then(function() {
          return q.count();
        })
        .then(function (count) {
          result.count = count.count;
          return result;
        });
    },

    buildSql: function (options) {

    },

    query: function (sql, parse) {
      return AV.Query.doCloudQuery(sql, parse);
    },

    execute: function (sql, parse) {

    },

    close: function () {

    },

    starTrans: function () {

    },

    commit: function () {

    },

    rollback: function () {

    }
  };
}
