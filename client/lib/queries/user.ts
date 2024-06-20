import { gql } from "@apollo/client";

const GET_USERS = gql`
query {
  users {
    email
    name
    
  }
}
`;

export {GET_USERS}