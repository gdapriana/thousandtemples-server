const adminMiddleware = async (req, res, next) => {
  const role = req.role
  console.log({ role })
  if (role === 'ADMIN') {
    next()
  } else {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  }
}

export default adminMiddleware;