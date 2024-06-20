"use client"
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

const EditButton = ({bookId} : any) => {
    const router = useRouter();
    const handleEdit = (id: string) => {
        router.push(`/books/${id}`);
      };
  return (
    <FaEdit
        className="icon cursor-pointer text-blue-500"
        onClick={() => handleEdit(bookId)}
  />
  )
}

export default EditButton
