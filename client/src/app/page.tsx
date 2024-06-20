import { getClient } from "../../lib/apolloClient";
import { gql } from "@apollo/client";
import { GET_USERS } from "../../lib/queries/user";
import BooksListPage from "./books/page";

const query = gql`
  query {
    users {
      email
      name
    }
  }
`;

export default async function Page() {
  const { data } = await getClient().query({query: GET_USERS});
  // const { loading, error, data } = useQuery(GET_CLIENTS);

  console.log("sat", data.users);
  const array = data.users;
  return (
    <>
     
     <BooksListPage/>
    </>
  );
}
