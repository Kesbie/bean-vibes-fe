import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import Image from "next/image";
import QueryProvider from "@/components/providers/QueryProvider";
import ClientLayout from "@/components/shared/ClientLayout";

const AddPlace = () => {
  return (
    <QueryProvider>
      <ClientLayout>
        <div className="container mx-auto flex flex-col justify-center items-center p-8">
          <Image
            alt="cafe-app"
            src="https://toidicafe.vn/images/suggest-place.svg"
            objectFit="cover"
            width={450}
            height={450}
          />
          <div className="text-base font-semibold text-green-500 my-6">
            Bạn vừa gợi ý địa điểm mới thành công. Chúng tôi sẽ kiểm tra trong
            thời gian sớm nhất!
          </div>
          <div className="text-center">
            <Link href={"/"} passHref legacyBehavior>
              <Button size="large" danger icon={<HomeOutlined />}>
                Quay về trang chủ
              </Button>
            </Link>
            <Link href={"/add-place"} passHref legacyBehavior>
              <Button className="ml-4" size="large" type="primary">
                <PlusOutlined />
                Thêm địa điểm khác
              </Button>
            </Link>
          </div>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
};

export default AddPlace;
