import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {subscriptionFormSchema, type SubscriptionFormValue} from "../schema/subscriptionFormSchema";

export const SubscriptionForm = ({onSubmit}: {
  onSubmit: (data: SubscriptionFormValue) => void
}) => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        이름
        <input type="text" placeholder={'이름을 입력해주세요'} {...register('name')}/>
      </label>
      {errors.name && <p>{errors.name.message}</p>}
      <label>
        이메일
        <input type="email" inputMode={'email'} placeholder={'이메일을 입력해주세요'} {...register('email')}/>
      </label>
      {errors.email && <p>{errors.email.message}</p>}
      <button type={'submit'}>신청</button>
    </form>
  )
}