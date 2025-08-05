import { useUser } from "../hooks/userContext";
import { useEffect, useState, useRef } from "react";
import profileImage from "../assets/icons/placeholder.png";
import EditProfileModal from "../components/EditProfileModal";
import { useProperty } from "../hooks/propertieContext";
import PropertyCard from "../components/PropertyCard";
import Properties from "./Properties";

const ViewProfile = () => {
  const { user } = useUser();
  const {
    leaseUserProperties,
    getLeaseUserProperties,
    hasMore,
    loadingLeaseProps,
    isFetchingLeaseRef,
  } = useProperty();

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Always call useEffect (not conditional). Guard inside the effect.
  useEffect(() => {
    if (user?.role !== "lease") return;
    // fetch page
    getLeaseUserProperties(currentPage);
  }, [user?.role, getLeaseUserProperties, currentPage]);

  // IntersectionObserver for infinite scroll (always call hook; guard inside)
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!hasMore) return;

    // If there's an existing observer, disconnect it first
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !loadingLeaseProps &&
          !isFetchingLeaseRef.current &&
          hasMore
        ) {
          // only increment page; use functional update
          setCurrentPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    observerRef.current.observe(el);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [hasMore, loadingLeaseProps]);

  return (
    <div className="min-h-screen bg-white  py-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-4 gap-2 px-3">
        <div className="flex items-center gap-4">
          <img
            src={profileImage}
            // src={user?.avatar || profileImage}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
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
        {user?.role === "lease" ? (
          <div className="p-3">
            <h3 className="text-lg font-bold mb-4">Your Properties</h3>
            <div className="w-full h-full grid grid-cols-2  gap-2">
              {leaseUserProperties?.map((property, idx) => (
                <PropertyCard key={property.id ?? idx} {...property} />
              ))}
            </div>
            <div ref={sentinelRef} />
            {loadingLeaseProps && <p>Loading...</p>}
          </div>
        ) : (
          <div>
            <Properties />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ViewProfile;
