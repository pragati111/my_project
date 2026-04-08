import { categories } from "../data/categories";
import { useNavigate } from "react-router-dom";
import TopHeader from "../components/TopHeader";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <>
    <TopHeader/>
    <div className="mt-16 p-4 md:hidden">
      {categories.map((cat, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{cat.name}</h2>

          {cat.children.map((sub, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium text-sm mb-2 text-gray-700">{sub.name}</p>

              <div className="grid grid-cols-2 gap-2">
                {sub.items.map((item, id) => (
                  <div
                    key={id}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="bg-gray-50 p-2 rounded-md text-center hover:bg-white hover:shadow cursor-pointer"
                  >
                    <div className="h-[45px] flex items-center justify-center mb-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <p className="text-xs leading-tight text-gray-600 truncate">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
}