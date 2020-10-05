const noteCtrl = {};
const Note = require("../models/Note");

noteCtrl.renderNoteForm = (req, res) => {
  //render por que vamos a renderizar una vista
  res.render("notes/new-note");
};

noteCtrl.createNewNote = async (req, res) => {
  //req.body es lo que recibe de la nueva nota
  const { title, description } = req.body;
  const newNote = new Note({ title: title, description: description });
  newNote.user = req.user.id;
  await newNote.save();

  req.flash("succes_msg", "Note added Successfully");
  res.redirect("/notes");
};

noteCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({
    createAt: "desc",
  });
  res.render("notes/all-notes", { notes });
};

noteCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note: note });
};

noteCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
  });
  req.flash("succes_msg", "Note Update Successfully");
  res.redirect("/notes");
};
noteCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  //una ves que elimina la nota redirecciona a la pagina actual
  req.flash("succes_msg", "Note Deleted Successfully");
  res.redirect("/notes");
};

module.exports = noteCtrl;
