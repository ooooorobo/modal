import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  subscriptionFormSchema,
  type SubscriptionFormValue,
  subscriptionFormYears,
  SubscriptionYearToNameMap
} from '../schema/subscriptionFormSchema';

export const SubscriptionForm = ({ onSubmit }: {
  onSubmit: (data: SubscriptionFormValue) => void
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>신청 폼</h2>
      <p>이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.</p>
      <label>
        이름 / 닉네임
        <input type="text" placeholder={'이름을 입력해주세요'} {...register('name')}/>
      </label>
      {errors.name && <p>{errors.name.message}</p>}
      <label>
        이메일
        <input type="email" inputMode={'email'} placeholder={'이메일을 입력해주세요'} {...register('email')}/>
      </label>
      {errors.email && <p>{errors.email.message}</p>}
      <label>
        FE 경력 연차
        <select {...register('years')}>
          {subscriptionFormYears.options.map(value => (
            <option value={value}>{SubscriptionYearToNameMap[value]}</option>
          ))}
        </select>
      </label>
      {errors.years && <p>{errors.years.message}</p>}
      <label>
        GitHub 링크 (선택)
        <input type="url" inputMode={'url'} placeholder={'https://github.com/username'} {...register('github')}/>
      </label>
      {errors.github && <p>{errors.github.message}</p>}

      <button type={'submit'}>신청</button>
    </form>
  )
}