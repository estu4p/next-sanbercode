import { useMutation } from "@/hooks/useMutation";
import {
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload,
    });

    if (!response?.success) {
      toast({
        title: "Login Gagal",
        description: "Periksa email dan password anda",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: response?.data?.expires,
        path: "/",
      });
      router.push("/");
      toast({
        title: "Login Berhasil",
        description: "Hello, welcome back!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Stack direction="column">
        <Heading as="h1" textAlign="center">
          Sign In
        </Heading>
        <Card padding="5" gap="5">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={payload.email}
              onChange={(event) =>
                setPayload({ ...payload, email: event.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={payload.password}
              onChange={(event) =>
                setPayload({ ...payload, password: event.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <Button onClick={() => HandleSubmit()}>Sign In</Button>
          </FormControl>
        </Card>
      </Stack>
    </Flex>
  );
}
