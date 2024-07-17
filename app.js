const express = require("express");
const app = express();
const listing = require("./models/listing");
const path = require("path");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("page working");
});

// app.get("/testlisting" ,  async (req, res) =>{
//   let samplelisting = new listing({
//     title: "My new villa",
//     description: "by the beach",
//     price: "1900",
//     location: "goa beach",
//     country: "India"

//   })
//   res.send("test successful");
//   await samplelisting.save();
// });

// index route //

app.get("/listings", async (req, res) => {
  let alllisting = await listing.find({});
  res.render("listings/index.ejs", { alllisting });
});
// new route//
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// show route //

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listings = await listing.findById(id);
  res.render("listings/show.ejs", { listings });
});

// create route //

app.post("/listings", async (req, res) => {
  const newlisting = new listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings");
});

// edit route//
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listings = await listing.findById(id);
  res.render("listings/edit.ejs", { listings });
});

// // update route //
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/ ${id}`);
});

// delete route //
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  res.redirect("/listings");
});

app.listen(7090, () => {
  console.log("server working on the page 7090");
});
