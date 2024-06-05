const handleError = ({ status, title, message }) => {
  return {
    status: status || "500",
    title: title || "Internal Server Error!",
    message: message || "Error in processing request! Please try again later.",
  };
};

export { handleError };
