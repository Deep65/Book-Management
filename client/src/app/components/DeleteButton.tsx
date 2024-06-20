import { DELETE_BOOK } from "./../../../lib/mutations/book";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_BOOKS } from "../../../lib/queries/book";


const DeleteButton = ({bookId}:any) => {

    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
      });
      
    const handleDelete = async (id: string) => {
        try {
          await deleteBook({ variables: { id } });
        } catch (err) {
          console.error("Delete book error", err);
        }
      };
  return (
    <FaTrash
    className="mr-2 cursor-pointer text-red-500"
    onClick={() => handleDelete(bookId)}
  />
  )
}

export default DeleteButton
