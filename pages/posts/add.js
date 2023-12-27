import dynamic from "next/dynamic";
import {
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function AddPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState({
    title: "",
    body: "",
  });

  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(posts),
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.push("/posts");
      }
      console.log("error");
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent metaTitle="Posts">
        <Card margin="5" padding="5">
          <Heading>Add Posts</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                onChange={(event) =>
                  setPosts({ ...posts, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Text>Body</Text>
              <Textarea
                onChange={(event) =>
                  setPosts({ ...posts, body: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Button onClick={() => HandleSubmit()} colorScheme="blue">
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
