const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

let authorization;
	if (req.headers.authorization !== undefined) {
		authorization = req.headers.authorization;
	}
	if (!authorization) {
        return next(new ErrorHandler('Login first to access this resource.', 401));
	}


	jwt.verify(authorization, process.env.JWT_SECRET, async (err, payload) => {
		if (err) {
            return next(new ErrorHandler('Login first to access this resource.', 401));
        }
        req.user = await User.findById(payload.id);
        next();
    });

});



exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        
if (!roles.includes(req.user.role)) {
    return next(new ErrorHandler(`(${req.user.role}) is not allowed to acccess this resource`, 403));
}
        next();
    }
}