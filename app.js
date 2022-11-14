const express = require("express");
const http = require("http");
const soap = require("soap");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");

const IndexRouter = require("./routes/index");
const SubjectService = require("./services/subjectService");
const ClientSubjectRequest = require("./routes/client_subject_request");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", IndexRouter);
app.use("/soap/subject-request", ClientSubjectRequest);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
const port = process.env.PORT || "8080";

const startServer = () => {
  server.listen(port);
  soap.listen(
    server,
    "/wsdl",
    SubjectService.service,
    SubjectService.xml
  );
  console.log(`Server started on port ${port}`);
};

startServer();

module.exports = app;
