import * as fs from "fs";

const Page = (props) => {
  return <>{props.title}</>;
};

export const getStaticPaths = async (ctx) => {
  return {
    paths: [
      {
        params: {
          slug: ["test"],
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  if (ctx.params.slug[0] !== "test") {
    return {
      notFound: true,
    };
  }

  const data = JSON.parse(
    fs.readFileSync("public/data.json") as unknown as string
  );

  if (!data.enabled) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  try {
    return {
      props: {
        title: data.title,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Page;
