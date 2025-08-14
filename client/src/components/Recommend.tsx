import RecommendCard from "./RecommendeCard";
import type { PropertyType } from "./PropertyCard";
import { useEffect, useState } from "react";
import usePropertyStore from "../hooks/usePropertyStore";

const Recommend = () => {
  const properties = usePropertyStore((state) => state.properties);

  const [recommend, setRecommend] = useState<PropertyType[]>([]);

  // useEffect(() => {
  //   if (!properties || properties.length < 2) return;

  //   const usedIndices = new Set<number>();
  //   const selected: PropertyType[] = [];

  //   while (selected.length < 2) {
  //     const randomIndex = Math.floor(Math.random() * properties.length);
  //     if (!usedIndices.has(randomIndex)) {
  //       usedIndices.add(randomIndex);
  //       selected.push(properties[randomIndex]);
  //     }
  //   }

  //   setRecommend(selected);
  // }, [properties]);

  useEffect(() => {
    if (!properties || properties.length < 2) return;

    const shuffled = [...properties].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    setRecommend(selected);
  }, [properties]);

  if (recommend.length === 0) return null;

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
