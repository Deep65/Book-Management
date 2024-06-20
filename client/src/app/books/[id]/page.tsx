import BookForm from '@/app/components/BookForm'

const UpdateBook = ({params}:any) => {
  console.log(params)
    return <BookForm mode='update' bookId={params.id}/>
}

export default UpdateBook
