import { CATEGORY_TYPES, PLACE_APPROVAL_STATUS, PLACE_STATUS, RESTRICTED_WORD_TYPES } from "./types";

const RestrictedWordTypesMap = new Map<string, {title: string, color: string}> ([
  [RESTRICTED_WORD_TYPES.BAN, { title: "Cấm", color: "red" }],
  [RESTRICTED_WORD_TYPES.WARN, { title: "Cảnh báo", color: "yellow" }],
  [RESTRICTED_WORD_TYPES.HIDE, { title: "Ẩn", color: "gray" }],
]);

const CategoryTypesMap = new Map<string, {title: string, color: string}> ([
  [CATEGORY_TYPES.SERVICE, { title: "Dịch vụ", color: "blue" }],
  [CATEGORY_TYPES.REGION, { title: "Khu vực", color: "green" }],  
  [CATEGORY_TYPES.STYLE, { title: "Phong cách", color: "purple" }],
  [CATEGORY_TYPES.PURPOSE, { title: "Mục đích", color: "orange" }],
]);

const PlaceStatusMap = new Map<string, {title: string, color: string}> ([
  [PLACE_STATUS.ACTIVE, { title: "Hoạt động", color: "green" }],
  [PLACE_STATUS.INACTIVE, { title: "Không hoạt động", color: "red" }],
]);

const PlaceApprovalStatusMap = new Map<string, {title: string, color: string}> ([
  [PLACE_APPROVAL_STATUS.APPROVED, { title: "Đã duyệt", color: "green" }],
  [PLACE_APPROVAL_STATUS.PENDING, { title: "Chờ duyệt", color: "yellow" }],
  [PLACE_APPROVAL_STATUS.REJECTED, { title: "Từ chối", color: "red" }],
]);

export { RestrictedWordTypesMap, CategoryTypesMap, PlaceStatusMap, PlaceApprovalStatusMap };