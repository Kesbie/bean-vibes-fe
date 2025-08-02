import { useQuery } from '@tanstack/react-query';
import { placeService, categoryService } from '@/services';
import { useState, useCallback } from 'react';

export const useHomeData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Fetch featured places (places with high rating or hot score)
  const {
    data: featuredPlaces,
    isLoading: isLoadingFeatured,
    error: featuredError
  } = useQuery({
    queryKey: ['featured-places', searchQuery, selectedCategory],
    queryFn: () => placeService.getPublicPlaces({
      limit: 8,
      ...(searchQuery && { search: searchQuery }),
      ...(selectedCategory && { categoryId: selectedCategory })
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch categories for filter
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getPublicCategories({ limit: 10 }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch nearby areas (districts with place counts)
  const {
    data: nearbyAreas,
    isLoading: isLoadingAreas,
    error: areasError
  } = useQuery({
    queryKey: ['nearby-areas'],
    queryFn: () => placeService.getPublicPlaces({
      limit: 4
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
  }, []);



  return {
    // Data - API trả về trực tiếp { results: [...] }
    featuredPlaces: featuredPlaces?.results || [],
    categories: categories?.results || [],
    nearbyAreas: nearbyAreas?.results || [],
    
    // Loading states
    isLoadingFeatured,
    isLoadingCategories,
    isLoadingAreas,
    
    // Error states
    featuredError,
    categoriesError,
    areasError,
    
    // Search state
    searchQuery,
    selectedCategory,
    
    // Actions
    handleSearch,
    handleCategoryChange,
    clearFilters,
    
    // Computed
    hasFilters: searchQuery || selectedCategory,
    totalResults: featuredPlaces?.totalResults || 0
  };
}; 