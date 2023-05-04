import Image from "next/image";
import CustomHeader from "../components/CustomHeader";
import ListArea from "../components/ListArea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <CustomHeader />
      <ListArea/>
    </main>
  );
}
