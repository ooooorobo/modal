import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  subscriptionFormSchema,
  type SubscriptionFormValue,
  subscriptionFormYears,
  SubscriptionYearToNameMap
} from '../schema/subscriptionFormSchema';
import styles from './SubscriptionForm.module.css';

export const SubscriptionForm = ({ onSubmit }: {
  onSubmit: (data: SubscriptionFormValue) => void
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: '',
      email: '',
    }
  })

  return (
    <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.TitleWrapper}>
        <h2 className={styles.Title}>신청 폼</h2>
        <p className={styles.Description}>이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.</p>
      </div>
      <label>
        이름 / 닉네임
        <input type="text" placeholder={'이름을 입력해주세요'} {...register('name')}/>
      </label>
      {errors.name && <p className={styles.Error}>{errors.name.message}</p>}
      <label>
        이메일
        <input type="email" inputMode={'email'} placeholder={'이메일을 입력해주세요'} {...register('email')}/>
      </label>
      {errors.email && <p className={styles.Error}>{errors.email.message}</p>}
      <label>
        FE 경력 연차
        <select {...register('years')}>
          {subscriptionFormYears.options.map(value => (
            <option value={value}>{SubscriptionYearToNameMap[value]}</option>
          ))}
        </select>
      </label>
      {errors.years && <p className={styles.Error}>{errors.years.message}</p>}
      <label>
        GitHub 링크 (선택)
        <input type="url" inputMode={'url'} placeholder={'https://github.com/username'} {...register('github')}/>
      </label>
      {errors.github && <p className={styles.Error}>{errors.github.message}</p>}

      <button type={'submit'}>제출하기</button>
    </form>
  )
}