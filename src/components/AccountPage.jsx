import TopHeader from "../components/TopHeader";
import { useAuth } from "./AuthContext";

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <>
      <TopHeader />

      <div className="pt-20 text-center">
        <h2 className="text-xl font-bold">MY ACCOUNT</h2>

        <div className="mt-4 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border flex items-center justify-center text-lg">
            {user?.name[0]}
          </div>
          <h3 className="mt-2 font-semibold">{user?.name}</h3>
          <p className="text-sm text-gray-500">+91 - {user?.mobile}</p>
        </div>
      </div>
    </>
  );
}