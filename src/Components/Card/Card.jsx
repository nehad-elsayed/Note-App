
// import axios from "axios";
// import { useFormik } from "formik";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Modal from "react-bootstrap/Modal";

// export default function CardItem({ note, deleteNote, getUserNotes }) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => {
//     setShow(false);
//     setIsEditing(false);
//   setNoteValues({});
//   };
//   const handleShow = () => setShow(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [noteValues, setNoteValues] = useState({});

//   const initialValues = {
//     title: isEditing ? noteValues.title : "",
//     content: isEditing ? noteValues.content : "",
//   };

//   function updateNote(values) {
//     axios
//       .put(
//         `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
//         values,
//         {
//           headers: {
//             token: `3b8ny__${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         getUserNotes();
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         handleClose();
//       });
//   }

//   const { handleSubmit, handleChange, values } = useFormik({
//     initialValues,
//     enableReinitialize:true,
//     onSubmit: updateNote,
//   });

//   function sendNotesValues(values) {
//     console.log(values);
//     setNoteValues(values);
//     setIsEditing(true);
//   }

//   return (
//     <div className="inner text-success p-4 rounded-3   position-relative">
//       <Card className="card ">
//         <Card.Body className="p-2">
//           <Card.Title className=" text-capitalize fw-bold">
//             {note.title}
//           </Card.Title>
//           <Card.Text>{note.createdAt.split("T", 1)}</Card.Text>
//           <Card.Text>{note.content}</Card.Text>

//           <Card.Footer className="card-footer text-muted p-3 d-flex align-items-center justify-content-between gap-2  ">
//             <Button variant="danger" onClick={() => deleteNote(note._id)}> 
//               Delete <i className="fa-solid fa-trash"></i>
//             </Button>
//             <Button
//               variant="info"
//               onClick={() => {
//                 sendNotesValues(note);
//                 handleShow();
//               }}
//             >
//               edit <i className="fa-solid fa-pen-to-square"></i>
//             </Button>
//           </Card.Footer>
//         </Card.Body>
//       </Card>

//       <Modal show={show} onHide={handleClose} backdrop="static">
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Note</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form action="">
//             <input
//               type="text"
//               className="form-control my-4"
//               placeholder="Note-Title"
//               name="title"
//               onChange={handleChange}
//               value={values.title}
//             />
//             <textarea
//               className="form-control"
//               placeholder="Note Content"
//               name="content"
//               onChange={handleChange}
//               value={values.content}
//             ></textarea>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleSubmit} variant="info">
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }





import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

export default function CardItem({ note, deleteNote, getUserNotes ,handleShowForDelete}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
  setNoteValues({});
  };
  const handleShow = () => setShow(true);
  const [isEditing, setIsEditing] = useState(false);
  const [noteValues, setNoteValues] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);


  function handleShowForDelete() {
    setDeleteModal(true);
  }
  function handleCloseForDelete() {
    setDeleteModal(false);
  }


  const initialValues = {
    title: isEditing ? noteValues.title : "",
    content: isEditing ? noteValues.content : "",
  };

  function updateNote(values) {
    axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getUserNotes();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  }

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    enableReinitialize:true,
    onSubmit: updateNote,
  });


    async function deleteNote(NoteId) {
      const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${NoteId}`,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
  
      getUserNotes(); //to display notes
      toast.success("Note deleted");
      handleCloseForDelete()
  
    }

  function sendNotesValues(values) {
    console.log(values);
    setNoteValues(values);
    setIsEditing(true);
  }

  return (
    <div className="inner text-success p-4 rounded-3   position-relative">
      <Card className="card ">
        <Card.Body className="p-2">
          <Card.Title className=" text-capitalize fw-bold">
            {note.title}
          </Card.Title>
          <Card.Text>{note.createdAt.split("T", 1)}</Card.Text>
          <Card.Text>{note.content}</Card.Text>

          <Card.Footer className="card-footer text-muted p-3 d-flex align-items-center justify-content-between gap-2  ">
            <Button variant="danger" onClick={() => {handleShowForDelete()}}> 
              Delete <i className="fa-solid fa-trash"></i>
            </Button>
            <Button
              variant="info"
              onClick={() => {
                sendNotesValues(note);
                handleShow();
              }}
            >
              edit <i className="fa-solid fa-pen-to-square"></i>
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <input
              type="text"
              className="form-control my-4"
              placeholder="Note-Title"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
            <textarea
              className="form-control"
              placeholder="Note Content"
              name="content"
              onChange={handleChange}
              value={values.content}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} variant="info">
            Update
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={deleteModal} onHide={handleCloseForDelete}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold">Deleting Note</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">Are You Sure To Delete this Note ??</Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={()=>{deleteNote(note._id)}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
