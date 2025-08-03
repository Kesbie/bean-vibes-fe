"use client";

import { placeService } from "@/services";
import { useSearchParams } from "next/navigation";
import { useCustomPaginatedQuery } from "@/hooks/useQuery";
import PlaceCard from "@/components/place/PlaceCard";
import { Empty, Pagination } from "antd";
import React from "react";

const SearchResults = () => {
  const searchParams = useSearchParams();

  const filters = {
    category: [
      ...searchParams.getAll("region"),
      ...searchParams.getAll("style"),
      ...searchParams.getAll("purpose"),
      ...searchParams.getAll("service")
    ]
  };

  console.log(filters);

  const { data: places, } = useCustomPaginatedQuery({
    queryKey: ["places", filters],
    api: placeService.getPlaces(filters)
  });

  return (
    <>
      {places?.totalResults === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Empty description="Không tìm thấy kết quả" />
        </div>
      ) : (
        <>
          <ul>
            {places?.results.map((place) => (
              <li key={place.id}>
                <PlaceCard type="horizontal" place={place} />
              </li>
            ))}
          </ul>
          <Pagination defaultCurrent={6} total={places?.totalResults} />
        </>
      )}
    </>
  );
};

export default React.memo(SearchResults);
