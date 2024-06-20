import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(data: { name: $name, email: $email, password: $password }) {
      name
      _id
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!){
  login(data: {email: $email, password: $password })
  }
`;

export { REGISTER_USER, LOGIN_USER };
