"use client";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

const EditButton = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const handleEdit = (bookId: string) => {
    router.push(`/books/${bookId}`);
  };
  return (
    <FaEdit
      className="icon cursor-pointer text-blue-500"
      onClick={() => handleEdit(bookId)}
    />
  );
};

export default EditButton;
