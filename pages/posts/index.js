import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function posts() {
  const router = useRouter();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const listPosts = await res.json();
      setPosts(listPosts);
    }
    fetchingData();
  }, []);

  console.log("Posts =>", posts);

  return (
    <>
      <LayoutComponent metaTitle={"Posts"}>
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/posts/add")}
            >
              Add Posts
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {posts?.map((item) => (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.body}</Text>
                    </CardBody>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button
                        onClick={() => router.push(`/posts/edit/${item?.id}`)}
                        flex="1"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button flex="1" colorScheme="red">
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </LayoutComponent>
    </>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch("https://dummyjson.com/posts");
//   const posts = await res.json();
//   return { props: { posts } };
// }
