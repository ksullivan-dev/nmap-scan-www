const afterSubmit = (response, cb, eb) => {
  setTimeout(async () => {
    if (response instanceof Error) {
      eb(response);
    } else if (response.redirect) {
      window.location.href = await response.redirect_url;
    } else {
      cb(response);
    }
  }, 400);
};

export default afterSubmit;
