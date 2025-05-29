import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1}); // Fetch all notes and sort them by creation date in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req,res) => {
    try {
        const noteById = await Note.findById(req.params.id);
        res.status(200).json(noteById);
        if(!noteById) return res.status(404).json({ message: "Note not found" });
    } catch (error) {
        console.log("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.status(200).json({ message: "Note updated successfully!" });

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
