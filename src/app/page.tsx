import DDImageChooser from "@/components/DDImageChooser";
import { MdImage } from "react-icons/md";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <DDImageChooser />
    </main>
  );
}
