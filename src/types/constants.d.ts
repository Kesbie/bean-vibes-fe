declare namespace App.Types.Constants {
  type SocialType = typeof import('@/constants').SOCIAL_TYPES[keyof typeof import('@/constants').SOCIAL_TYPES];
  type PlaceStatus = typeof import('@/constants').PLACE_STATUS[keyof typeof import('@/constants').PLACE_STATUS];
  type PlaceApprovalStatus = typeof import('@/constants').PLACE_APPROVAL_STATUS[keyof typeof import('@/constants').PLACE_APPROVAL_STATUS];
  type RestrictedWordType = typeof import('@/constants').RESTRICTED_WORD_TYPES[keyof typeof import('@/constants').RESTRICTED_WORD_TYPES];
  type CategoryType = typeof import('@/constants').CATEGORY_TYPES[keyof typeof import('@/constants').CATEGORY_TYPES];
}
