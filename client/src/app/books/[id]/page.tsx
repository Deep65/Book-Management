import BookForm from "@/app/components/BookForm";

type UpdateBookParams = {
  params: {
    id: string;
  };
};

const UpdateBook = ({ params }: UpdateBookParams) => {
  return <BookForm mode="update" bookId={params.id} />;
};

export default UpdateBook;
