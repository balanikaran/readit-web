import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Layout } from "../components/Layout";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="/createPost">
        <Link>create a new post</Link>
      </NextLink>
      <br />
      {!data ? null : data.posts.map((post) => <div>{post.title}</div>)}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
