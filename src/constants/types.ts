const RESTRICTED_WORD_TYPES = {
  BAN: 'ban',
  WARN: 'warn',
  HIDE: 'hide',
} as const;

const CATEGORY_TYPES = {
  SERVICE: 'service',
  REGION: 'region',
  STYLE: 'style',
  PURPOSE: 'purpose',
} as const;

const PLACE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

const PLACE_APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

const SOCIAL_TYPES = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  TWITTER: 'twitter',
  WEBSITE: 'website',
} as const;

const OPEN_STATUS = {
  OPEN: 'open',
  CLOSE: 'close',
} as const;

const RATING_TYPES = {
  LOCATION: 'location',
  DRINK_QUALITY: 'drinkQuality',
  SERVICE: 'service',
  STAFF_ATTITUDE: 'staffAttitude',
  PRICE: 'price',
} as const;

const RATE_QUALITY = {
  POOR: 'poor',
  AVERAGE: 'average',
  NORMAL: 'normal',
  GOOD: 'good',
  EXCELLENT: 'excellent',
} as const;

const REPORT_STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
} as const;

const REPORT_TYPES = {
  REVIEW: 'Review',
  COMMENT: 'Comment',
} as const;

const REPORT_RESOLVED_ACTIONS = {
  DELETE: 'delete',
  HIDE: 'hide',
  BAN_USER: 'ban_user',
  WARN_USER: 'warn_user',
} as const;

export { RESTRICTED_WORD_TYPES, CATEGORY_TYPES, PLACE_STATUS, PLACE_APPROVAL_STATUS, SOCIAL_TYPES, RATING_TYPES, RATE_QUALITY, OPEN_STATUS, REPORT_STATUS, REPORT_TYPES, REPORT_RESOLVED_ACTIONS };