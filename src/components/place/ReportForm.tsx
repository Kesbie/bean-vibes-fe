import { Button, Form, Input } from "antd";
import { useCustomMutation } from "@/hooks/useQuery";
import { reportService } from "@/services";

type Props = {
  id: string;
  type: "Review" | "Comment";
  onSuccess?: () => void;
};

const ReportForm = (props: Props) => {
  const { id, type, onSuccess } = props;

  const { mutate: report } = useCustomMutation({
    mutationFn: (values: App.Types.Report.ReportCreate) => {
      return reportService.createReport(values);
    },
    messageConfigs: {
      successMessage: "Báo cáo thành công!",
      errorMessage: "Báo cáo thất bại!"
    },
    onSuccess: () => {
      onSuccess?.();
    }
  });

  const handleSubmit = (values: App.Types.Report.ReportCreate) => {
    report({
      ...values,
      reportableModel: type,
      reportable: id
    });
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="reason"
        label="Lý do báo cáo"
        rules={[{ required: true, message: "Lý do báo cáo là bắt buộc" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Báo cáo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReportForm;
