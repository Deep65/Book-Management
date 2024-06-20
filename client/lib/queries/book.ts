import { gql } from "@apollo/client";

const GET_BOOKS = gql`
query {
  books {
    _id
    author
    title
    genre
  }
}
`;

const GET_BOOK_BY_ID = gql`
query findBookById($bookId: ID!) {
  findBookById(_id: $bookId){
    _id
    author
    title
    genre
  }
}
`;

export {GET_BOOKS, GET_BOOK_BY_ID}