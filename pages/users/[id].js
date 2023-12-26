import Layout from "@/layouts";
import Link from "next/link";

export default function DetailUsers({ users }) {
  console.log("users : ", users);
  return (
    <>
      <Layout
        metaTitle={"Users"}
        metaDescription={"Informasi users dari Next App"}
      >
        <div className="content">
          <img
            src={users.image}
            alt="Img html"
            style={{ width: 150, height: 150 }}
          />
          <p>
            Username: {users.firstName} {users.lastName}
          </p>
          <p>Age: {users.age}</p>
          <p>Email: {users.email}</p>
          <p>Phone: {users.phone}</p>
          <Link
            href={"/users"}
            className="bg-blue-500 px-3 py-1 rounded-lg mt-4"
          >
            Back
          </Link>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/users");
  const users = await res.json();

  const paths = users.users.map((item) => ({
    params: {
      id: item.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const users = await res.json();
  return { props: { users } };
}
