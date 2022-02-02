const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

/*Server setup*/

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

/*DB Connection*/

mongoose
  .connect("mongodb+srv://tushar:0ilMeEBKbwgFHPZj@tusharclusterone.smcfi.mongodb.net/Task1?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log(`DB error report: ${e}`);
  });

/*Schema*/

const userSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  text: String,
  api: Number,
});
const user = new mongoose.model("Post", userSchema);

/*Routes*/

// update and add route

app.route("/update/:id").put((req, res, next) => {
  user.findById(req.params.id, function (err, user) {
    if (!user) return next(new Error("Unable to find data!"));
    else {
      user.heading = req.body.heading;
      user.subheading = req.body.subheading;
      user.text = req.body.text;
      user.api = req.body.api;

      user
        .save()
        .then(res.status(200).send({ message: "Data updated." }))
        .catch((err) => {
          res.status(400).send({ message: "Unable to update!" });
        });
    }
  });
});

//get route

app.get("/getdata", async (req, res, next) => {
  try {
    const course = await user.find();
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get route using id

app.route("/getdata2/:id").get(async (req, res, next) => {
  try {
    const course = await user.findById(req.params.id);
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});
