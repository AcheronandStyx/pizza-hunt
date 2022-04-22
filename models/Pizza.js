const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true, // just like js remove whitespace before and after the string
    },
    createdAt: {
      type: Date,
      default: Date.now, // defaults to current date
      // getters transform the data by default every time it's queried.
      // we can use the timestamp value for storage, but use a prettier version of it for display.
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"], // the enum option stands for enumerable, a popular term in web development that refers to a set of data that can be iterated over—much like using the for...in loop to iterate through an object.
      default: "Large",
    },
    toppings: [], // [] indicates an array type
    comments: [
      // array of comments
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", //  tells the Pizza model which documents to search to find the right comments.
      },
    ],
  },
  {
    toJSON: {
      // enable virtuals
      virtuals: true,
      getters: true, // enable getters
    },
    id: false, // We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
  }
);

// get total count of comments and replies on retrieval
// virtuals are not in the database and are usually computed values
PizzaSchema.virtual("commentCount").get(function () {
  // so it includes replies as well
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
