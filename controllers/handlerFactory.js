const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOneHandler = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError(`No document found with this id`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDocument = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDocument) {
      return next(new AppError('No document found with this id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedDocument,
      },
    });
  });
