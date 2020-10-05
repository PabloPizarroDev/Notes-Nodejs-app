const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

const { isAutenticated } = require("../helpers/auth");

//new note
router.get("/notes/add", isAutenticated, renderNoteForm);

router.post("notes/new-note", isAutenticated, createNewNote);
//get all note
router.get("/notes", isAutenticated, renderNotes);

//edit notes
router.get("/notes/edit/:id", isAutenticated, renderEditForm);

router.put("/notes/edit/:id", isAutenticated, updateNote);

//Eliminar
router.delete("/notes/delete/:id", isAutenticated, deleteNote);

module.exports = router;
