const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fruits "blueprint"
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  rating: {
    type: Number,
    min: 1, // Validation
    max: 10, // Validation
  },
  review: String,
});

// Will create the Fruit(s) collection automatically.
const Fruit = mongoose.model("Fruit", fruitSchema);

// Create the fruit
const fruit = new Fruit({
  name: "Peach",
  rating: 10,
  review: "Peaches are yum",
});

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "Very nice",
// });

// const orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   review: "Okay fruit",
// });

// const banana = new Fruit({
//   name: "Banana",
//   rating: 9,
//   review: "Very good fruit",
// });

// Insert the fruit
// fruit.save();

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("No error");
//   }
// });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema, // Embedded document
});

const Person = mongoose.model("Person", personSchema);

// const watermelon = new Fruit({
//   name: "Watermelon",
//   rating: 10,
//   review: "Yummy Yummy",
// });

// watermelon.save();

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple,
// });

// person.save();

// Go into the Fruits collection to find ALL since I did not specify what I am looking for before the callback.
Fruit.find(function (err, res) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    res.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

// Updates the fruit with that ID with new values of Peach for its name
// Fruit.updateOne(
//   {
//     _id: "6117bd191f33372e2cfd27d9",
//   },
//   {
//     name: "Peach",
//   },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("No Error updating fruit.");
//     }
//   }
// );

Person.updateOne(
  {
    _id: "6117c131a9d8613880834254",
  },
  {
    favouriteFruit: watermelon,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("No error updating the person");
    }
  }
);

// Delete the fruit with that ID
// Fruit.deleteOne(
//   {
//     _id: "6117c223c02339195474b87e",
//   },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("No error deleting fruit.");
//     }
//   }
// );

// GOOD BYE JOHN(S)!
// Person.deleteMany(
//   {
//     name: "John",
//   },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("No error deleting all the JOHNS!");
//     }
//   }
// );
