//Centralised errpr handling middleware

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    error: err.message,
    message: "Something went werong",
  });
};

export default errorHandler;