let soap = require("soap");
let url = "http://34.135.153.12:8080/wsdl?wsdl";
let express = require("express");
let router = express.Router();

const subject_request = async (req, res) => {
  try {
    console.log("Requesting subjects...");
    let client = await soap.createClientAsync(url);
    console.log("Client created...");
    let result = await client.AllSubjectsAsync({});
    console.log("Result: ", result);
    return result;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};
router.get("/", async (req, res) => {
  let result = await subject_request(req, res);
  res.send(result);
});

module.exports = router;
