import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '~/modules/acount/hook/use-auth';
import { registerSchema, type RegisterFormData } from '../../schema/auth.schema';

interface RegisterFormProps {
  onSuccess?: () => void;
}
export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register: registerUser, status } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: RegisterFormData) => {
    const { ConfirmPassword, ...apiPayload } = data;
    void ConfirmPassword;
    registerUser(
      { body: apiPayload },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <input
            {...register('FirstName')}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          {errors.FirstName && (
            <span className="text-red-500 text-xs">{errors.FirstName.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input {...register('LastName')} placeholder="Last Name" className="border p-2 rounded" />
          {errors.LastName && (
            <span className="text-red-500 text-xs">{errors.LastName.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register('Email')}
          type="email"
          placeholder="Email Address"
          className="border p-2 rounded"
        />
        {errors.Email && <span className="text-red-500 text-xs">{errors.Email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register('Password')}
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        {errors.Password && <span className="text-red-500 text-xs">{errors.Password.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register('ConfirmPassword')}
          type="password"
          placeholder="Confirm Password"
          className="border p-2 rounded"
        />
        {errors.ConfirmPassword && (
          <span className="text-red-500 text-xs">{errors.ConfirmPassword.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={status.isRegistering}
        className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
      >
        {status.isRegistering ? 'Processing...' : 'Create Account'}
      </button>
    </form>
  );
};
