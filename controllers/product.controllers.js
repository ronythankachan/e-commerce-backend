const saveProduct = (req, res) => {
  console.log(req.files);
  console.log(JSON.stringify(req.body));
  res.send("testing");
};
const deleteProduct = (req, res) => {};

module.exports = {
  saveProduct,
  deleteProduct,
};
