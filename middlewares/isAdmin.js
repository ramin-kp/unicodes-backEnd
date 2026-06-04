const isAdmin = async (req, res, next) => {
  const userIsAdmin = req?.user?.role === "ADMIN";

  try {
    if (userIsAdmin) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "شما مجوز لازم برای دسترسی به این بخش را ندارید.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "خطای سرور در بررسی دسترسی کاربر.",
      errorCode: "SERVER_ERROR",
    });
  }
};

module.exports = isAdmin;
