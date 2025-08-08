import { Icon } from "@iconify/react";
import { Avatar, Button, Dropdown, Typography } from "antd";
import React from "react";
import Modal from "../modals";
import ReportForm from "./ReportForm";

type Props = {
  review: App.Types.Review.ReviewResponse;
};

const PlaceReviewItem = (props: Props) => {
  const { review } = props;

  const reportModalRef = React.useRef<App.Components.Modal.ModalRef>(null);

  const showReportModal = () => {
    reportModalRef.current?.show();
  };

  return (
    <div className="flex gap-8">
      <Avatar className="min-w-16 min-h-16" src={review.user?.avatar?.url} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Typography.Text className="text-base font-semibold">
              {review.title}
            </Typography.Text>
            <Typography.Text className="text-base">
              {review.user?.name}
            </Typography.Text>
          </div>
          <Typography.Text className="">{review.content}</Typography.Text>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Typography.Text className="flex items-center gap-2">
              <Icon icon="iconamoon:like-thin" width="24" height="24" />
              {/* <span>{review.helpfulCount}</span> */}
            </Typography.Text>
            <Typography.Text className="flex items-center gap-2">
              <Icon icon="iconamoon:dislike-thin" width="24" height="24" />
              {/* <span>{review.helpfulCount}</span> */}
            </Typography.Text>
          </div>
          <Dropdown
            menu={{
              items: [
                {
                  key: "report",
                  label: "Báo cáo",
                  icon: <Icon icon="mdi:flag" />
                }
              ],
              onClick: ({ key }) => {
                if (key === "report") {
                  showReportModal();
                } else {
                  console.log(key);
                }
              }
            }}
          >
            <Button type="text">
              <Icon icon="mdi:dots-horizontal" />
            </Button>
          </Dropdown>
          {review.comments.length > 0 && (
            <div className="flex items-center gap-2">
              <Icon icon="iconamoon:comment-thin" width="24" height="24" />
              <span>{review.comments.length}</span>
            </div>
          )}
        </div>
      </div>
      <Modal
        footer={false}
        ref={reportModalRef}
        title={
          <Typography.Text className="text-2xl font-bold text-center">
            Báo cáo
          </Typography.Text>
        }
        width={800}
      >
        <ReportForm onSuccess={() => {
          reportModalRef.current?.hide();
        }} id={review.id} type="Review" />
      </Modal>
    </div>
  );
};

export default PlaceReviewItem;
