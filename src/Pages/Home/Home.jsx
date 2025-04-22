import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import CardItem from "../../Components/Card/Card";
import { counterContext } from "../../contexts/ConterContext";
import { authContext } from "../../contexts/auth";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notes, setNotes] = useState([]);
 const {setCounter}= useContext(counterContext)



  const initialValues = {
    title:  "",
    content:"",
  };

  function addNote(values) {
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Note has been Added");
        getUserNotes() //to display notes => display the new notes every time we add a new one
     
      })
      .catch((err) => {
        console.log(err.response);
        
      })
      .finally(() => {
        handleClose();
        //to close modal after added note dynamically
      });
  }

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: addNote,
  });



  //Calling Api to get  user Notes
  async function getUserNotes() {
    try {
      const { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      setNotes(data.notes.reverse());
      setCounter(data.notes.length)
    } catch (error) {
      setNotes(null)
      setCounter(0) //to aviod the error during deleting the last note 
    }
 
  }


  //calling to delete note
  async function deleteNote(NoteId){
    const {data} =await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${NoteId}`,{
      headers:{
        token: `3b8ny__${localStorage.getItem("token")}`
      }
    })
    console.log( data)
    getUserNotes() //to display notes
    toast.success("Note deleted")
    
  }

  useEffect(() => {
    getUserNotes(); //display notes 
  }, []);




  return (
    <>
       <div className="min-vh-100 p-2">
        <button
          className=" p-2 fs-2 text-info mt-2  fw-bolder d-block ms-auto rounded-2 border-0 "
          onClick={handleShow}
        >
          <i className="fa-solid fa-plus"></i> Add Note
        </button>
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add A New Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="">
              <input
                type="text"
                className="form-control my-4"
                placeholder="Note-Title"
                name="title"
                onChange={handleChange}
              />
              <textarea
                className="form-control"
                placeholder="Note Content"
                name="content"
                onChange={handleChange}
              ></textarea>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit} variant="primary">
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      {notes ?  <div className="row g-2 mt-3">
          {notes?.map((note) => {
            return <div key={note._id} className="col-12  p-2" ><CardItem   note={note} deleteNote={deleteNote} getUserNotes={getUserNotes} /></div>
          })}
        </div> : <h1 className="text-danger my-4  fs-1 text-center text-capitalize">Hi <i className="fa-regular fa-hand-peace"></i> Your Note List is Empty !! </h1>}
      </div>  
    </>
  );
}
