import { useForm, Controller } from 'react-hook-form';
import styles from './Form.module.css';
import { FormProps, ErrorsInterface } from './types';
import text from './constant';
import { useState } from 'react';

const Form = (props: FormProps) => {
  const [imgUrl, setImgUrl] = useState('');
  let file!: Blob;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<ErrorsInterface>();

  const handleImageChange = (e: React.BaseSyntheticEvent<HTMLInputElement> | React.FormEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    file = e.target.files[0];
    reader.onloadend = () => {
      setImgUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submit = (data: ErrorsInterface) => {
    const name: string = data.name;
    const days = +data.tourLength;
    const dayPrice = +data.pricePerDay;
    const discount = +data.discount;
    props.onSubmit({
      title: name,
      startDate: data.date,
      description: data.style,
      destinations: data.destinations,
      age: data.age,
      image: imgUrl,
      price: `${dayPrice * days}`,
      discountPercentage: +data.discount,
      discountPrice: `${Math.floor((dayPrice * days * (100 - discount)) / 100)}`,
      save: +`${Math.floor(dayPrice * days - (dayPrice * days * (100 - discount)) / 100)}`,
      pricePerDay: dayPrice,
      tourLength: days,
    });
    alert('The data has been saved');
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <label>
        Tour name:
        <input
          className={styles.form__item}
          {...register('name', {
            required: text.errorItems[0],
            minLength: {
              value: 3,
              message: 'Should be more then 3 symbols',
            },
            pattern: {
              value: /^[A-ZА-Я].+/,
              message: 'Should starts with uppercased letter',
            },
          })}
          defaultValue=""
          data-testid="name"
        />
        <div className={styles.error}>
          {errors?.name && <p>{errors?.name?.message || 'Error!'}</p>}
        </div>
      </label>
      <label>
        Destinations:
        <input
          className={styles.form__item}
          {...register('destinations', {
            required: text.errorItems[1],
          })}
          defaultValue=""
        />
        <div className={styles.error}>
          {errors?.destinations && <p>{errors?.destinations?.message || 'Error!'}</p>}
        </div>
      </label>
      <label>
        Start date:
        <input
          className={styles.form__item}
          type="date"
          defaultValue=""
          {...register('date', {
            required: text.errorItems[2],
          })}
        />
        {errors?.date && <span className={styles.error}>{errors?.date?.message}</span>}
      </label>
      <label>
        Travel Style:
        <select
          className={styles.form__item}
          defaultValue=""
          {...register('style', {
            required: text.errorItems[3],
          })}
        >
          <option value="" disabled></option>
          {text.selectItems.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        {errors?.style && <span className={styles.error}>{errors?.style?.message}</span>}
      </label>
      <label>
        Select an age range
        <Controller
          control={control}
          name="age"
          rules={{ required: text.errorItems[4] }}
          render={({ field: { onChange } }) => (
            <div className={styles.radio__container}>
              {text.radioItems.map((radio, index) => (
                <div className={styles.radio} key={index}>
                  <input
                    type="radio"
                    value={radio}
                    {...register('age', { required: text.errorItems[4] })}
                    onChange={onChange}
                  />
                  {radio}
                </div>
              ))}
            </div>
          )}
        />
        {errors.age?.type === 'required' && (
          <span className={styles.error}>{errors?.age?.message}</span>
        )}
      </label>
      <div className={styles.price}>
        <label className={styles.price__label}>
          Tour length:
          <input
            className={styles.price__item}
            type="number"
            defaultValue=""
            {...register('tourLength', {
              required: text.errorItems[5],
              min: {
                value: 1,
                message: text.errorItems[5],
              },
            })}
            data-testid="number"
          />
        </label>
        <label className={styles.price__label}>
          Price per day:
          <input
            className={styles.price__item}
            type="number"
            defaultValue=""
            {...register('pricePerDay', {
              required: text.errorItems[6],
              min: {
                value: 0,
                message: text.errorItems[6],
              },
            })}
          />
        </label>
        <label className={styles.price__label}>
          Discount:
          <input
            className={styles.price__item}
            type="number"
            defaultValue=""
            {...register('discount', {
              required: text.errorItems[7],
              min: {
                value: 0,
                message: text.errorItems[7],
              },
            })}
          />
        </label>
        <div>
          {errors?.tourLength && <span className={styles.error}>{errors?.tourLength.message}</span>}
          {errors?.pricePerDay && (
            <span className={styles.error}>{errors?.pricePerDay?.message}</span>
          )}
          {errors?.discount && <span className={styles.error}>{errors?.discount?.message}</span>}
        </div>
      </div>
      <label className={styles.photo__container}>Add photo</label>
      <input
        type="file"
        {...register('img', {
          required: text.errorItems[8],
        })}
        onChange={(e) => handleImageChange(e)}
      />
      {errors?.img && <div className={styles.error}>{errors?.img?.message}</div>}
      <label>
        I agree with the rules of the site:
        <Controller
          control={control}
          name="agree"
          rules={{ required: text.errorItems[9] }}
          render={({ field: { onChange } }) => (
            <input
              type="checkbox"
              {...register('agree', { required: text.errorItems[4] })}
              onChange={onChange}
            />
          )}
        />
        {errors?.agree?.type === 'required' && (
          <span className={styles.error}>{errors?.agree?.message}</span>
        )}
      </label>
      <input className={styles.button} type="submit" value="Submit" />
    </form>
  );
};

export default Form;
