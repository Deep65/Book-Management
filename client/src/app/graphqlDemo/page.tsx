// export default async function Page() {
//   const data = await fetch("https://rickandmortyapi.com/graphql", {
//     method: "POST",
//     body: JSON.stringify({
//       query: '{ "query":"""query {
//   episodes {
//     info {
//       count
//     }
//   }
// }""" }',
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => {
//     res.json();
//     console.log(res.json(), "****");
//   });

//   return <main>{}</main>;
// }
