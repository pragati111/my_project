import TopHeader from "../components/TopHeader";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ADDRESS_STORAGE_KEY = "user_addresses";

export default function ManageAddressPage() {
  const navigate = useNavigate();
  const [editId, setEditId] = useState(null);

  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length) {
          const hasDefault = parsed.some((addr) => addr.isDefault);
          return parsed.map((addr, index) => ({
            ...addr,
            isDefault: addr.isDefault || (!hasDefault && index === 0),
          }));
        }
      } catch (error) {
        console.warn("Failed to parse saved addresses", error);
      }
    }

    return [
      {
        id: 1,
        text: "D-482, Malviya Nagar, Jaipur, Rajasthan, 302017",
        type: "Home",
        isDefault: true,
      },
    ];
  });

  const [showAdd, setShowAdd] = useState(false);

  const [formData, setFormData] = useState({
    house: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
    type: "",
    landmark: "",
  });

  useEffect(() => {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  // ✅ ADD ADDRESS (FIXED)
  const handleAdd = () => {
  if (!formData.house || !formData.area || !formData.pincode) {
    alert("Please fill required fields");
    return;
  }

  const fullAddress = `${formData.house}, ${formData.area}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

  if (editId) {
    // ✅ EDIT MODE
    setAddresses(
      addresses.map((a) =>
        a.id === editId
          ? {
              ...a,
              text: fullAddress,
              type: formData.type,
            }
          : a
      )
    );
  } else {
    // ✅ ADD MODE
    setAddresses([
      ...addresses,
      {
        id: Date.now(),
        text: fullAddress,
        type: formData.type,
        isDefault: false,
      },
    ]);
  }

  // RESET EVERYTHING
  setFormData({
    house: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
    type: "",
    landmark: "",
  });

  setEditId(null);
  setShowAdd(false);
};

  // DELETE
  const handleDelete = (id) => {
    setAddresses((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      if (!updated.some((a) => a.isDefault) && updated.length > 0) {
        updated[0] = { ...updated[0], isDefault: true };
      }
      return updated;
    });
  };

  // SET DEFAULT
  const setDefault = (id) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  return (
    <>
      <TopHeader />

      <div className="mt-5 pt-20 px-4 md:px-10 bg-gray-100 min-h-screen">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div onClick={() => navigate(-1)} className="cursor-pointer">
            <ArrowLeft />
          </div>

          <h2 className="text-lg font-semibold">Manage Address</h2>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
          >
            + Add Address
          </button>
        </div>

        {/* ADDRESS LIST */}
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition border ${
                addr.isDefault ? "border-black" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    checked={addr.isDefault}
                    onChange={() => setDefault(addr.id)}
                  />

                  <div>
                    {addr.isDefault && (
                      <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}

                    {addr.type && (
                      <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">
                        {addr.type}
                      </span>
                    )}

                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                      {addr.text}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-gray-400">
                  <Pencil
  size={18}
  onClick={() => {
    const addrParts = addr.text.split(", ");

    setFormData({
      house: addrParts[0] || "",
      area: addrParts[1] || "",
      city: addrParts[2] || "",
      state: addrParts[3]?.split(" - ")[0] || "",
      pincode: addrParts[3]?.split(" - ")[1] || "",
      type: addr.type || "",
      landmark: "",
    });

    setEditId(addr.id);
    setShowAdd(true);
  }}
  className="cursor-pointer hover:text-blue-500"
/>
                  <Trash2
                    size={18}
                    onClick={() => handleDelete(addr.id)}
                    className="cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ ADD ADDRESS MODAL */}
        {showAdd && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-[95%] md:w-[500px] max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl">
              
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-6">
                <ArrowLeft
                  className="cursor-pointer"
                  onClick={() => setShowAdd(false)}
                />
                <h2>{editId ? "Edit Address" : "Add a new address"}</h2>
              </div>

              {/* FORM */}
              <div className="space-y-4">
                
                <input
                  value={formData.house}
                  onChange={(e) =>
                    setFormData({ ...formData, house: e.target.value })
                  }
                  placeholder="House no, Building Name"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  placeholder="Location, Town, Area"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                  placeholder="Pin Code"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                />

                <div className="flex gap-3">
                  <input
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="City"
                    className="w-1/2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  />

                  <select
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-1/2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  >
                    <option value="">Select State</option>
                    <option>Rajasthan</option>
                    <option>Delhi</option>
                    <option>Maharashtra</option>
                  </select>
                </div>

                {/* ADDRESS TYPE */}
                <div>
                  <p className="text-sm font-medium mb-2">
                    Address Type <span className="text-gray-400">(optional)</span>
                  </p>

                  <div className="flex gap-3">
                    {["Home", "Work", "Other"].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setFormData({ ...formData, type })
                        }
                        className={`px-4 py-2 rounded-lg border text-sm transition ${
                          formData.type === type
                            ? "bg-black text-white"
                            : "hover:bg-black hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData({ ...formData, landmark: e.target.value })
                  }
                  placeholder="Landmark (optional)"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  rows={3}
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowAdd(false)}
                  className="w-1/2 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  className="w-1/2 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 transition"
                >
                  {editId ? "Update Address" : "Add Address"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}