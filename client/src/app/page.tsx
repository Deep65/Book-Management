import { getClient } from "../../lib/apolloClient";
import { gql } from "@apollo/client";
import { GET_USERS } from "../../lib/queries/user";

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
      <p className="text-black">Hola</p>
      {/* {array.map((item: any) => {
        <>
          <div className="text-black bg-red">Email:- {item.email}</div>
          <div>Name:- {item.name}</div>
        </>;
      })} */}

      {array.map((item: any, index: number) => (
        <div key={index}>
          <div className="text-black bg-red">Email: {item.email}</div>
          <div>Name: {item.name}</div>
        </div>
      ))}
      <p className="text-black">Hola</p>
    </>
  );
}
