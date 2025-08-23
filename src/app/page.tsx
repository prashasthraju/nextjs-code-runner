import Navbar from "./components/Navbar";
import Coderunner from "./components/Coderunner";

export default function Home() {
  return (
    <div className="homewrapper h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="codewrapper flex flex-row flex-1 gap-4 p-4">
        <Coderunner />
        {/* You can add more side panels here if you want */}
      </div>
    </div>
  );
}
