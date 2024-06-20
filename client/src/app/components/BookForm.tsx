"use client";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, UPDATE_BOOK } from "../../../lib/mutations/book"; // Import your queries and mutations
import { GET_BOOK_BY_ID, GET_BOOKS } from "../../../lib/queries/book";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IBookForm {
  title: string;
  genre: string;
  author: string;
}

interface BookFormProps {
  bookId?: string;
  mode: "add" | "update";
}

// Create a validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  genre: yup.string().required("Genre is required"),
  author: yup.string().required("Author is required")
});

const BookForm: React.FC<BookFormProps> = ({ bookId, mode }) => {
  const router = useRouter();
    console.log(bookId, mode,"ww")
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IBookForm>({
    resolver: yupResolver(schema)
  });

  const [addBook, { loading: addLoading, error: addError }] = useMutation(ADD_BOOK,{
    refetchQueries: [{ query: GET_BOOKS }]
  });

  const [updateBook, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BOOK,{
    refetchQueries: [{ query: GET_BOOKS }]
  }
    
  );

  const { data: bookData, loading: bookLoading } = useQuery(GET_BOOK_BY_ID, {
    variables:{bookId} ,
    skip: mode === "add",
  });

  useEffect(() => {
    if (bookData) {
      reset({
        title: bookData.findBookById.title,
        genre: bookData.findBookById.genre,
        author: bookData.findBookById.author,
      });
    }
  }, [bookData, reset]);

  const onSubmit = async (formData: IBookForm) => {
    if (mode === "add") {
      try {
        const response = await addBook({ variables: formData  });
        if (response.data) {
          router.push("/books");
        }
      } catch (err) {
        console.error("Add book error", err);
      }
    } else {
      try {
        console.log(formData,"formData")
        const payload = {...formData,id:bookId}
        console.log(payload,"payload")
        const response = await updateBook({ variables:  payload  });
        if (response.data) {
          router.push("/books");
        }
      } catch (err) {
        console.error("Update book error", err);
      }
    }
  };

  if (mode === "update" && bookLoading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {mode === "add" ? "Add a New Book" : "Update Book"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              {...register("title")}
              className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded mt-1 text-black`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input
              type="text"
              {...register("genre")}
              className={`w-full p-3 border ${errors.genre ? 'border-red-500' : 'border-gray-300'} rounded mt-1 text-black`}
            />
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              {...register("author")}
              className={`w-full p-3 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded mt-1 text-black`}
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>
          
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold">
            {mode === "add" ? (addLoading ? 'Adding...' : 'Add Book') : (updateLoading ? 'Updating...' : 'Update Book')}
          </button>
          
          {mode === "add" && addError && <p className="text-red-500 text-sm mt-4">{addError.message}</p>}
          {mode === "update" && updateError && <p className="text-red-500 text-sm mt-4">{updateError.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default BookForm;
