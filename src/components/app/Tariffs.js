export const BLOKS = {
  BEGINNER: 'beginner',
  PRO: 'pro',
  BUSINESS: 'business'
}

export const TITLES = {
  [BLOKS.BEGINNER]: 'Beginner',
  [BLOKS.PRO]: 'Pro',
  [BLOKS.BUSINESS]: 'Business'
}

export const DESCRIPTION = {
  [BLOKS.BEGINNER]: 'Для небольшого исследования',
  [BLOKS.PRO]: 'Для HR и фрилансеров',
  [BLOKS.BUSINESS]: 'Для корпоративных клиентов'
}

export const IMAGE = {
  [BLOKS.BEGINNER]: '/images/beginner.svg',
  [BLOKS.PRO]: '/images/pro.svg',
  [BLOKS.BUSINESS]: '/images/business.svg'
}

export const COLOR = {
  [BLOKS.BEGINNER]: '#FFB64F',
  [BLOKS.PRO]: '#7CE3E1',
  [BLOKS.BUSINESS]: '#000000'
}

export const ACTUAL_PRICE = {
  [BLOKS.BEGINNER]: '7 999',
  [BLOKS.PRO]: '1 299',
  [BLOKS.BUSINESS]: '2 379'
}

export const OLD_PRISE = {
  [BLOKS.BEGINNER]: '2 600',
  [BLOKS.PRO]: '2 600',
  [BLOKS.BUSINESS]: '3 700'
}

export const PAYMENT_AMOUNT = {
  [BLOKS.BEGINNER]: '150',
  [BLOKS.PRO]: '279',
  [BLOKS.BUSINESS]: ''
}

export const CONTAINS = {
  [BLOKS.BEGINNER]: [
    'Безлимитная история запросов',
    'Безопасная сделка',
    'Поддержка 24/7'
  ],
  [BLOKS.PRO]: [
    'Все пункты тарифа Beginner',
    'Экспорт истории',
    'Рекомендации по приоритетам'
  ],
  [BLOKS.BUSINESS]: [
    'Все пункты тарифа Pro',
    'Безлимитное количество запросов',
    'Приоритетная поддержка'
  ]
}
