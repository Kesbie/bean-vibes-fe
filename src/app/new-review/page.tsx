"use client";

import React from "react";
import {
  Typography
} from "antd";
import ClientLayout from "@/components/shared/ClientLayout";
import QueryProvider from "@/components/providers/QueryProvider";
import NewReviewForm from "./form";
import { useRouter } from "next/navigation";

export default function WriteReviewPage() {
  const router = useRouter();

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
          <NewReviewForm onSuccess={() => {
            router.push(`/place/${place.slug}`);
          }}/>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
}
