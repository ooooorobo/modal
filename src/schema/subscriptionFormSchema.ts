import { z } from 'zod';

export const subscriptionFormYears = z.enum([ '0-3', '4-7', '8+' ], { error: '연차를 선택해주세요' });

export const SubscriptionYearToNameMap: Record<(typeof subscriptionFormYears['options'])[number], string> = {
  '0-3': '0-3년',
  '4-7': '4-7년',
  '8+': '8년 이상'
}

export const subscriptionFormSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
  email: z.email({ error: '이메일을 정확히 입력해주세요' }),
  years: subscriptionFormYears,
  github: z.url({ hostname: /^github\.com$/, error: 'github url을 입력해주세요' }).optional()
})

export type SubscriptionFormValue = z.infer<typeof subscriptionFormSchema>