import axios from "axios";

function Post({ post }) {
  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/research/${params.id}`
    );
    const post = res.data;

    return {
      props: { post },
      revalidate: 60, // 1分ごとに再生成
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default Post;
