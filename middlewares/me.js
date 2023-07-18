const { asyncError, errorhandler } = require("@/middlewares/error");
const { checkAuth } = require("@/utils/features");

module.exports.checkAuth = asyncError(async (req, res) => {
    if (req.method !== "GET")
        return errorhandler(res, 400, "Only GEt Method is allowed");


    const user = await checkAuth(req)

    if (!user) return errorhandler(res, 401, "Login First")

    res.status(200).json({
        succes: true,
        user,
    });


})



