import { Button, Form, Input, Select } from "antd";
import { SocialTypesMap } from "@/constants";
import { convertMapToArray } from "@/lib/utils";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const socialTypes = convertMapToArray(SocialTypesMap);

const Socials = () => {
  return (
    <Form.Item label="Liên kết">
      <Form.List name="socials">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div key={field.key} className="flex items-center gap-2">
                <Form.Item
                  className="min-w-[30%]"
                  {...field}
                  rules={[
                    { required: true, message: "Vui lòng chọn loại liên kết" }
                  ]}
                  name={[field.name, "type"]}
                >
                  <Select
                    placeholder="Chọn loại liên kết"
                    options={socialTypes}
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  {...field}
                  rules={[
                    { required: true, message: "Vui lòng nhập liên kết" }
                  ]}
                  name={[field.name, "url"]}
                >
                  <Input placeholder="Nhập liên kết" />
                </Form.Item>
                <Button
                  className="!min-w-8 mb-6"
                  type="default"
                  onClick={() => remove(field.name)}
                  icon={<MinusOutlined />}
                />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm liên kết
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default Socials;
