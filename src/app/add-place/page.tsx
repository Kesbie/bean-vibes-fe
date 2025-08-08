"use client";

import { Typography } from "antd";
import ClientLayout from "@/components/shared/ClientLayout";
import QueryProvider from "@/components/providers/QueryProvider";
import PlaceForm from "@/components/places/PlaceForm";

const { Title, Paragraph } = Typography;

export default function AddPlacePage() {
  return (
    <QueryProvider>
      <ClientLayout>
        <div className="mt-4 mb-4 max-w-4xl mx-auto px-4 py-8 rounded-lg shadow-md bg-white">
          <div className="mb-6">
            <Title level={2} className="text-center mb-4">
              Thêm địa điểm
            </Title>
            <Paragraph className="text-center text-gray-600 mb-6">
              Những quán cafe yêu thích của bạn chưa có trên Bean Vibes? Chia sẻ
              với cộng đồng ngay!
            </Paragraph>
          </div>
          <PlaceForm />
        </div>
      </ClientLayout>
    </QueryProvider>
  );
}
