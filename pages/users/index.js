import Layout from "@/layouts";
import Link from "next/link";

export default function Users({ users }) {
  return (
    <>
      <Layout
        metaTitle={"Users"}
        metaDescription={"Informasi users dari Next App"}
      >
        <div className="h-full m-4 ">
          {users.users.map((item) => (
            <div className="flex gap-2 mb-2 border-b-2">
              <p>{item.firstName}.</p>
              <p>Age: {item.age}</p>
              <Link
                href={`/users/${item.id}`}
                className="text-blue-500 underline"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/users");
  const users = await res.json();
  return { props: { users }, revalidate: 10 };
}
