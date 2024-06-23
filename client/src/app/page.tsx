import { cookies } from "next/headers";

import BooksListPage from "./books/page";
import Register from "./(auth)/register/page";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return <>{token ? <BooksListPage /> : <Register />}</>;
}
