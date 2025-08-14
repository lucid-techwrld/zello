import { useEffect, useState, Useref } from "react";
import profileImage from "../assets/icons/placeholder.png";
import EditProfileModal from "../components/EditProfileModal";
import PropertyCard from "../components/PropertyCard";
import Properties from "./Properties";
import usePropertyStore from "../hooks/usePropertyStore";
import useUserStore from "../hooks/useUserStore";

const ViewProfile = () => {
  const User = useUserStore((state) => state.User);
  // Extract only the needed values, not the whole object, to avoid re-renders
  const leaseUserProperties = usePropertyStore(
    (state) => state.leaseUserProperties
  );
  const hasMore = usePropertyStore((state) => state.hasMore);
  const loadingLeaseProps = usePropertyStore(
    (state) => state.loadingLeaseProps
  );
  const isFetchingLeaseRef = usePropertyStore(
    (state) => state.isFetchingLeaseRef
  );
  // Memoize the function so its reference is stable
  const getLeaseUserProperties = usePropertyStore(
    (state) => state.getLeaseUserProperties
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (User?.role !== "lease") return;
    getLeaseUserProperties();
    // Only depend on User?.role and the stable function reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User?.role]);

  const sentinelRef = Useref<HTMLDivElement | null>(null);
  const observerRef = Useref<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !isFetchingLeaseRef.current &&
          hasMore &&
          !loadingLeaseProps
        ) {
          getLeaseUserProperties();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
    // Only depend on hasMore, loadingLeaseProps, and the stable function reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loadingLeaseProps]);

  return (
    <div className="min-h-screen bg-white  py-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-4 gap-2 px-3">
        <div className="flex items-center gap-4">
          <img
            src={profileImage}
            // src={User?.avatar || profileImage}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {User?.first_name} {User?.last_name}
            </h2>
            <p className="text-gray-600 text-sm">{User?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {/* Role-based Section */}
      <div className="mt-8">
        {User?.role === "lease" ? (
          <div className="p-3">
            <h3 className="text-lg font-bold mb-4">Your Properties</h3>
            <div className="w-full h-full grid grid-cols-2  gap-2">
              {leaseUserProperties?.map((property, idx) => (
                <PropertyCard key={property.id ?? idx} {...property} />
              ))}
            </div>
            <div ref={sentinelRef} />
            <div className="flex justify-center items-center">
              {loadingLeaseProps && <div className="loader1"></div>}
            </div>
          </div>
        ) : (
          <div>
            <Properties />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EditProfileModal User={User} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ViewProfile;
