"use client";

import { placeService } from "@/services";
import { useSearchParams, useRouter } from "next/navigation";
import { useCustomPaginatedQuery } from "@/hooks/useQuery";
import PlaceCard from "@/components/place/PlaceCard";
import { Empty, Pagination, Button, Tag, Switch } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

// Utility function to remove undefined values from object
const removeUndefinedValues = (obj: Record<string, any>): Record<string, any> => {
  const cleaned: Record<string, any> = {};
  
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        // For arrays, filter out empty values and keep if not empty
        const filteredArray = value.filter(item => item !== undefined && item !== null && item !== "");
        if (filteredArray.length > 0) {
          cleaned[key] = filteredArray;
        }
      } else {
        cleaned[key] = value;
      }
    }
  });
  
  return cleaned;
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showGrouped, setShowGrouped] = React.useState(true);

  const rawFilters = {
    category: [
      ...searchParams.getAll("region"),
      ...searchParams.getAll("style"),
      ...searchParams.getAll("purpose"),
      ...searchParams.getAll("service")
    ],
    name: searchParams.get("name")
  };

  // Clean filters by removing undefined values
  const filters = React.useMemo(() => {
    return removeUndefinedValues(rawFilters);
  }, [rawFilters]);

  const { data: places, } = useCustomPaginatedQuery({
    queryKey: ["places", filters],
    api: placeService.getPlaces(filters)
  });

  // Get all active search parameters
  const activeParams = Array.from(searchParams.entries());
  const hasActiveFilters = activeParams.length > 0;

  // Filter type mapping
  const filterTypeMap = {
    name: "Tên",
    region: "Khu vực",
    style: "Phong cách",
    purpose: "Mục đích",
    service: "Dịch vụ"
  };

  // Group filters by type
  const groupedFilters = React.useMemo(() => {
    const groups: Record<string, string[]> = {};
    
    activeParams.forEach(([key, value]) => {
      // Skip name filter as it will be handled separately
      if (key === 'name') return;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(value);
    });
    
    return groups;
  }, [activeParams]);

  // Get name filter separately
  const nameFilter = React.useMemo(() => {
    return searchParams.get('name');
  }, [searchParams]);

  // Clear all filters
  const handleClearAll = () => {
    router.push("/search");
  };

  // Remove specific filter
  const handleRemoveFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const values = newParams.getAll(key);
    newParams.delete(key);
    
    // Re-add all values except the one to remove
    values.forEach(v => {
      if (v !== value) {
        newParams.append(key, v);
      }
    });
    
    router.push(`?${newParams.toString()}`);
  };

  // Remove all filters of a specific type
  const handleRemoveFilterType = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    router.push(`?${newParams.toString()}`);
  };

  // Remove name filter
  const handleRemoveNameFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('name');
    router.push(`?${newParams.toString()}`);
  };

  return (
    <>
      {places?.totalResults === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Empty description="Không tìm thấy kết quả" />
        </div>
      ) : (
        <>
          {/* Search Results Header */}
          <div className="mb-6">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Tìm thấy {places?.totalResults || 0} địa điểm
              </h2>
              {hasActiveFilters && (
                <Button 
                  type="text" 
                  icon={<CloseOutlined />}
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700"
                >
                  Bỏ tất cả
                </Button>
              )}
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="mb-4">
                {/* Name filter - always shown separately */}
                {nameFilter && (
                  <div className="mb-3">
                    <Tag
                      closable
                      onClose={handleRemoveNameFilter}
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {filterTypeMap.name}: {decodeURIComponent(nameFilter)}
                    </Tag>
                  </div>
                )}

                {/* Other filters */}
                {Object.keys(groupedFilters).length > 0 && (
                  <>
                    {/* Toggle switch */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-600">Hiển thị:</span>
                      <Switch
                        checked={showGrouped}
                        onChange={setShowGrouped}
                        checkedChildren="Nhóm"
                        unCheckedChildren="Chi tiết"
                        size="small"
                      />
                    </div>

                    {showGrouped ? (
                      // Grouped view
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(groupedFilters).map(([key, values]) => (
                          <div key={key} className="flex items-center gap-1">
                            <Tag
                              closable
                              onClose={() => handleRemoveFilterType(key)}
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {filterTypeMap[key as keyof typeof filterTypeMap] || key}: {values.length} lựa chọn
                            </Tag>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Individual view
                      <div className="flex flex-wrap gap-2">
                        {activeParams
                          .filter(([key]) => key !== 'name') // Exclude name from individual view
                          .map(([key, value]) => (
                            <Tag
                              key={`${key}-${value}`}
                              closable
                              onClose={() => handleRemoveFilter(key, value)}
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {filterTypeMap[key as keyof typeof filterTypeMap] || key}: {decodeURIComponent(value)}
                            </Tag>
                          ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Results list */}
            <ul>
              {places?.results.map((place) => (
                <li key={place.id}>
                  <PlaceCard type="horizontal" place={place} />
                </li>
              ))}
            </ul>
            <Pagination defaultCurrent={6} total={places?.totalResults} />
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(SearchResults);

