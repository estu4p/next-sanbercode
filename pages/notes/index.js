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
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Notes() {
  const { data, isLoading } = useQueries({
    prefixUrl: "http://localhost:3000/api/notes",
  });
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent metaTitle={"Notes"}>
        <Box padding="5">
          <Flex justifyContent="end" alignItems={"start"}>
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
              Add Notes
            </Button>
          </Flex>
          {isLoading ? (
            <Flex justify="center" alignItems="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <Flex justify={"center"}>
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {data?.data.map((item) => (
                  <GridItem key={item?.id}>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>
                      <CardFooter justify="space-between" flexWrap="wrap">
                        <Button
                          onClick={() => router.push(`/notes/edit/${item?.id}`)}
                          flex="1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item?.id)}
                          flex="1"
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          )}
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
