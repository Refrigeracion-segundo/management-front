import Image from "next/image";
import styles from "./page.module.css";
import { Login } from "./pages/login";
import { DialogUser } from "@/components/dialogUser";
import { Users } from "./pages/users";

export default function Home() {
  return (
    <main>
      {/* <Login /> */}
      <Users />
    </main>
  );
}
