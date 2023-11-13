import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const data = await getServerSession(authOptions);
  return <main>{JSON.stringify(data)}</main>;
}
