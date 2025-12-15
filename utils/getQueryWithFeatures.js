const APIFeatures = require('./apiFeatures');

module.exports = async (model, query) => {
  const features = new APIFeatures(model, query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await features.query;
};
