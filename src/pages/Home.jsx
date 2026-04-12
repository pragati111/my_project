import TopHeader from "../components/TopHeader";
import BottomBar from "../components/BottomBar";
import HomeContent from "../components/HomeContent";

export default function Home() {
  return (
    <div className="md:hidden">
      
      <TopHeader />

      <div className="pt-[80px] pb-[80px]">
        <HomeContent />
      </div>

      <BottomBar />
    </div>
  );
}