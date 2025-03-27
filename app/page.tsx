import Image from "next/image";
import Link from "next/link";
import NavBar from "./component/NavBar/navBar";
import Intro from "./component/Pages/Intro/Intro";
import Marque from "./component/Pages/Intro/Marque";
import MainPage from "./array/page";
import App from "./component/Pages/Intro/home";



export default function Home() {
  return (
    <div className="w-full h-screen bg-zinc-950 text-white">
      <App/>
    </div>
  );
}

