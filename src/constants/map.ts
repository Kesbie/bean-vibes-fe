import { CATEGORY_TYPES, PLACE_APPROVAL_STATUS, PLACE_STATUS, RESTRICTED_WORD_TYPES, SOCIAL_TYPES, RATING_TYPES, RATE_QUALITY, OPEN_STATUS, REPORT_STATUS, REPORT_TYPES, REPORT_RESOLVED_ACTIONS } from "./types";

const RestrictedWordTypesMap = new Map<string, { title: string, color: string }>([
  [RESTRICTED_WORD_TYPES.BAN, { title: "Cấm", color: "red" }],
  [RESTRICTED_WORD_TYPES.WARN, { title: "Cảnh báo", color: "yellow" }],
  [RESTRICTED_WORD_TYPES.HIDE, { title: "Ẩn", color: "gray" }],
]);

const CategoryTypesMap = new Map<string, { title: string, color: string }>([
  [CATEGORY_TYPES.SERVICE, { title: "Dịch vụ", color: "blue" }],
  [CATEGORY_TYPES.REGION, { title: "Khu vực", color: "green" }],
  [CATEGORY_TYPES.STYLE, { title: "Phong cách", color: "purple" }],
  [CATEGORY_TYPES.PURPOSE, { title: "Mục đích", color: "orange" }],
]);

const PlaceStatusMap = new Map<string, { title: string, color: string }>([
  [PLACE_STATUS.ACTIVE, { title: "Hoạt động", color: "green" }],
  [PLACE_STATUS.INACTIVE, { title: "Không hoạt động", color: "red" }],
]);

const PlaceApprovalStatusMap = new Map<string, { title: string, color: string }>([
  [PLACE_APPROVAL_STATUS.APPROVED, { title: "Đã duyệt", color: "green" }],
  [PLACE_APPROVAL_STATUS.PENDING, { title: "Chờ duyệt", color: "yellow" }],
  [PLACE_APPROVAL_STATUS.REJECTED, { title: "Từ chối", color: "red" }],
]);

const SocialTypesMap = new Map<string, { title: string, color: string }>([
  [SOCIAL_TYPES.FACEBOOK, { title: "Facebook", color: "blue" }],
  [SOCIAL_TYPES.INSTAGRAM, { title: "Instagram", color: "purple" }],
  [SOCIAL_TYPES.TIKTOK, { title: "TikTok", color: "red" }],
  [SOCIAL_TYPES.YOUTUBE, { title: "YouTube", color: "orange" }],
  [SOCIAL_TYPES.TWITTER, { title: "Twitter", color: "green" }],
  [SOCIAL_TYPES.WEBSITE, { title: "Website", color: "gray" }],
]);

const RatingTypesMap = new Map<string, { title: string, color: string }>([
  [RATING_TYPES.DRINK_QUALITY, { title: "Chất lượng đồ uống", color: "blue" }],
  [RATING_TYPES.LOCATION, { title: "Vị trí", color: "green" }],
  [RATING_TYPES.PRICE, { title: "Giá cả", color: "orange" }],
  [RATING_TYPES.SERVICE, { title: "Chất lượng dịch vụ", color: "purple" }],
  [RATING_TYPES.STAFF_ATTITUDE, { title: "Thái độ nhân viên", color: "red" }],
]);

const RateQualityMap = new Map<number, { title: string, color: string }>([
  [1, { title: "Tệ", color: "red" }],
  [2, { title: "Trung bình", color: "yellow" }],
  [3, { title: "Bình thường", color: "green" }],
  [4, { title: "Tốt", color: "blue" }],
  [5, { title: "Tuyệt vời", color: "purple" }],
]);

const OpenStatusMap = new Map<string, { title: string, color: string }>([
  [OPEN_STATUS.OPEN, { title: "Đang mở cửa", color: "green" }],
  [OPEN_STATUS.CLOSE, { title: "Đã đóng cửa", color: "red" }],
]);

const ReportStatusMap = new Map<string, { title: string, color: string }>([
  [REPORT_STATUS.PENDING, { title: "Chờ xử lý", color: "yellow" }],
  [REPORT_STATUS.RESOLVED, { title: "Đã xử lý", color: "green" }],
]);

const ReportTypesMap = new Map<string, { title: string, color: string }>([
  [REPORT_TYPES.REVIEW, { title: "Đánh giá", color: "red" }],
  [REPORT_TYPES.COMMENT, { title: "Bình luận", color: "yellow" }],
]);

const ReportResolvedActionsMap = new Map<string, { title: string, color: string }>([
  [REPORT_RESOLVED_ACTIONS.DELETE, { title: "Xóa nội dung", color: "red" }],
  [REPORT_RESOLVED_ACTIONS.HIDE, { title: "Ẩn nội dung", color: "gray" }],
  [REPORT_RESOLVED_ACTIONS.BAN_USER, { title: "Cấm người dùng", color: "red" }],
  [REPORT_RESOLVED_ACTIONS.WARN_USER, { title: "Cảnh báo người dùng", color: "yellow" }],
]);

export { RestrictedWordTypesMap, CategoryTypesMap, PlaceStatusMap, PlaceApprovalStatusMap, SocialTypesMap, RatingTypesMap, RateQualityMap, OpenStatusMap, ReportStatusMap, ReportTypesMap, ReportResolvedActionsMap };