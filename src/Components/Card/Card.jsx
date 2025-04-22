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
//             />
//             <textarea
//               className="form-control"
//               placeholder="Note Content"
//               name="content"
//               onChange={handleChange}
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



// newwwwwww




import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

export default function CardItem({ note, deleteNote, getUserNotes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
  setNoteValues({});
  };
  const handleShow = () => setShow(true);
  const [isEditing, setIsEditing] = useState(false);
  const [noteValues, setNoteValues] = useState({});

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
            <Button variant="danger" onClick={() => deleteNote(note._id)}>
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
    </div>
  );
}
