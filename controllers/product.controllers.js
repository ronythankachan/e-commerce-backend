const saveProduct = (req, res) => {
  console.log(req.files.length);
  console.log(JSON.stringify(req.body));
  res.send("testing");
};
const deleteProduct = (req, res) => {};

module.exports = {
  saveProduct,
  deleteProduct,
};
