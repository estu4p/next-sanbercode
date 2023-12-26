import Layout from "@/layouts";

export default function posts({ posts }) {
  console.log("Posts : ", posts);
  return (
    <>
      <Layout
        metaTitle={"Posts"}
        metaDescription={"Informasi posts dari Next App"}
      >
        <div className="h-full m-4 ">
          {posts.posts.map((item) => (
            <div className="flex gap-2 mb-2 border-b-2">
              <p className="font-bold">{item.title}.</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://dummyjson.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
