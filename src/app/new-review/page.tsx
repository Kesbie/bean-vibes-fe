"use client";

import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Rate,
  Button,
  Switch,
  message,
  Select,
  Spin,
  Empty,
  Typography
} from "antd";
import { SearchOutlined, StarOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { placeService, reviewService } from "@/services";
import ClientLayout from "@/components/shared/ClientLayout";
import QueryProvider from "@/components/providers/QueryProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NewReviewForm from "./form";

const { TextArea } = Input;
const { Option } = Select;

export default function WriteReviewPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  console.log("hello");

  const { data: places, isLoading: searchingPlaces } = useQuery({
    queryKey: ["places", "search", searchQuery],
    queryFn: () =>
      placeService.getPublicPlaces({
        search: searchQuery,
        limit: 10
      }),
    enabled: searchQuery.length > 2
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handlePlaceSelect = (placeId: string) => {
    const place = places?.results?.find((p: any) => p.id === placeId);
    setSelectedPlace(place);
    form.setFieldsValue({ placeId });
  };

  const handleSubmit = async (values: any) => {
    if (!selectedPlace) {
      message.error("Vui lòng chọn địa điểm");
      return;
    }

    try {
      setLoading(true);
      await reviewService.createReview({
        content: values.content,
        rating: values.rating,
        placeId: selectedPlace.id,
        isAnonymous: values.isAnonymous || false
      });

      message.success("Đánh giá đã được đăng thành công!");
      router.push(`/place/${selectedPlace.id}`);
    } catch (error) {
      console.error("Error creating review:", error);
      message.error("Có lỗi xảy ra khi đăng đánh giá");
    } finally {
      setLoading(false);
    }
  };

  return (
    <QueryProvider>
      <ClientLayout>
      <div className="mt-4 mb-4 max-w-4xl mx-auto px-4 py-8 rounded-lg shadow-md bg-white">
          <div className="mb-6">
            <Typography.Title level={2} className="text-center mb-4">
              Viết đánh giá
            </Typography.Title>
            <Typography.Paragraph className="text-center text-gray-600 mb-6">
              Chia sẻ trải nghiệm của bạn về địa điểm yêu thích
            </Typography.Paragraph>
          </div>
          <NewReviewForm />
        </div>
      </ClientLayout>
    </QueryProvider>
  );
}
