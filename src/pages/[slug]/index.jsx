import axios from "axios";

const Page = ({ page }) => {
  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: pages } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages`
  );

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const { data: page } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages?slug=${slug}`
  );

  return {
    props: { page: page[0] },
    revalidate: 60,
  };
};

export default Page;
