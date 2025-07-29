import RecommendCard from "./RecommendeCard";
import type { PropertyType } from "./PropertyCard";
import { useProperty } from "../hooks/propertieContext";

const Recommend = () => {
  const { properties } = useProperty();

  if (!properties) {
    return;
  }
  const usedIndices = new Set<number>();
  const recommend: PropertyType[] = [];

  while (recommend.length < 2) {
    const randomIndex = Math.floor(Math.random() * properties.length);

    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      recommend.push(properties[randomIndex]);
    }
  }
  return (
    <div className="w-full h-auto p-3">
      <div className="flex justify-between">
        <p className="text-lg font-bold">You might like</p>{" "}
      </div>
      {recommend?.map((prop, idx) => (
        <RecommendCard key={idx} {...prop} />
      ))}
    </div>
  );
};

export default Recommend;
