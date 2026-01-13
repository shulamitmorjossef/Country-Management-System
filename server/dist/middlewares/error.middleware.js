"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
exports.errorHandler = errorHandler;
const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
exports.catchAsync = catchAsync;
function errorHandler(err, req, res, next) {
    console.error("Error:", err.message || err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
}
