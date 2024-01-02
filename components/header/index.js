import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export default function Header() {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { mutate } = useMutation();
  // const { data } = useQueries({
  //   prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
  //   headers: {
  //     Authorization: `Bearer ${Cookies.get("user_token")}`,
  //   },
  // });

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (response?.success) {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

  return (
    // Styling dengan Tailwind CSS
    <>
      <section className="bg-amber-400 px-8 py-2 flex justify-between items-center">
        <div className="flex gap-5 items-center justify-center">
          <div className="bg-black px-3 py-2 rounded-sm ">
            <span className="text-white text-xl font-bold">Header</span>
          </div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {userData?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => HandleLogout()}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="cursor-pointer hover:text-white">
            Home
          </Link>
          <Link href="/profile" className="cursor-pointer hover:text-white">
            Profile
          </Link>
          <Link href="/users" className="cursor-pointer hover:text-white">
            Users
          </Link>
          <Link href="/notes" className="cursor-pointer hover:text-white">
            Notes
          </Link>
        </div>
      </section>
    </>
  );
}
