import { useQuery } from '@tanstack/react-query';
import { placeService, categoryService } from '@/services';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const useSearchData = () => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    categoryId: searchParams.get('category') || '',
    district: searchParams.get('district') || '',
    ward: searchParams.get('ward') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    sortBy: searchParams.get('sortBy') || 'hotScore',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '10')
  });

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      search: searchParams.get('q') || '',
      categoryId: searchParams.get('category') || '',
      district: searchParams.get('district') || '',
      ward: searchParams.get('ward') || '',
      priceMin: searchParams.get('priceMin') || '',
      priceMax: searchParams.get('priceMax') || '',
      sortBy: searchParams.get('sortBy') || 'hotScore',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10')
    });
  }, [searchParams]);

  // Fetch search results
  const {
    data: searchResults,
    isLoading: isLoadingResults,
    error: resultsError
  } = useQuery({
    queryKey: ['search-results', filters],
    queryFn: () => placeService.getPublicPlaces({
      limit: filters.limit,
      page: filters.page,
      ...(filters.search && { search: filters.search }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.district && { district: filters.district }),
      ...(filters.ward && { ward: filters.ward }),
      ...(filters.priceMin && { priceMin: filters.priceMin }),
      ...(filters.priceMax && { priceMax: filters.priceMax })
    }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Fetch categories for filter
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError
  } = useQuery({
    queryKey: ['search-categories'],
    queryFn: () => categoryService.getPublicCategories({ limit: 50 }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      categoryId: '',
      district: '',
      ward: '',
      priceMin: '',
      priceMax: '',
      sortBy: 'hotScore',
      sortOrder: 'desc',
      page: 1,
      limit: 10
    });
  }, []);

  return {
    // Data
    searchResults: searchResults?.data?.results || [],
    categories: categories?.data?.results || [],
    
    // Pagination
    totalResults: searchResults?.data?.totalResults || 0,
    totalPages: searchResults?.data?.totalPages || 0,
    currentPage: filters.page,
    
    // Loading states
    isLoadingResults,
    isLoadingCategories,
    
    // Error states
    resultsError,
    categoriesError,
    
    // Filters
    filters,
    updateFilters,
    clearFilters,
    
    // Computed
    hasFilters: filters.search || filters.categoryId || filters.district || filters.ward || filters.priceMin || filters.priceMax
  };
}; 