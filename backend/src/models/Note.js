import mongoose from "mongoose";

// 1 - create a schema
// 2 - model based on the schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt , updatedAt timestamps will be added automatically
);

const Note = mongoose.model("Note" , noteSchema);

export default Note;