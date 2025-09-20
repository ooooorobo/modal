import {z} from "zod";

export const subscriptionFormSchema = z.object({
  name: z.string().min(1, {message: '이름을 입력해주세요'}),
  email: z.email({error: '이메일을 정확히 입력해주세요'}),
})

export type SubscriptionFormValue = z.infer<typeof subscriptionFormSchema>