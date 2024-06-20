import { gql } from "@apollo/client";

const ADD_BOOK = gql`
  mutation addBook($author: String!, $genre: String!, $title: String!) {
    addBook(args: { author: $author, genre: $genre, title: $title }) {
     _id
     author
     
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation updateBook($author: String!, $genre: String!, $title: String!,$id: ID!){
    updateBook(args: { author: $author, genre: $genre, title: $title },_id: $id){
        _id
        author
        title
    }
  }
`;

export { ADD_BOOK, UPDATE_BOOK };
