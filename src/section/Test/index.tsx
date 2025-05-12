'use client';

import React, { useState } from 'react';
import { useToast } from '@/component/Toast/hooks/useToast';
import { ToastType } from '@/component/Toast/types/IToast';
import Button from '@/component/UI/Button';
import Checkbox from '@/component/UI/Checkbox';
import Radio from '@/component/UI/Radio';
import Dropdown from '@/component/UI/Dropdown';

export default function Test() {
  const { showToast } = useToast();
  const [country, setCountry] = useState('vn');
  // const toasts = useContext(ToastContext);
  // console.log(toasts);
  return (
    <div className="space-y-3 space-x-3">
      <p>showcase</p>
      <button
        onClick={() => showToast('Test hiển thị toast success!', ToastType.SUCCESS)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast Success
      </button>
      <button
        onClick={() => showToast('Test hiển thị toast error!', ToastType.ERROR)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast Error
      </button>
      <button
        onClick={() => showToast('Test hiển thị toast info!', ToastType.INFO)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast Info
      </button>
      <Button
        onClick={() => showToast('Test hiển thị toast warning!', ToastType.WARNING)}
        label="Show Toast Warning"
      />
      <div className="flex h-56 w-1/2 flex-wrap">
        <div className="mr-3 flex flex-col">
          <Checkbox label="test"></Checkbox>
          <Checkbox label="test"></Checkbox>
        </div>
        <div className="mr-3 flex flex-col">
          <Radio name="meomeo" label="test" disabled></Radio>
          <Radio name="meomeo" label="test2"></Radio>
          <Radio name="meomeo" label="test3"></Radio>
        </div>
        <Dropdown
          name="country"
          label="Quốc gia"
          placeholder="Chọn quốc gia"
          options={[
            { label: 'Việt Nam', value: 'vn' },
            { label: 'Mỹ', value: 'us' },
            { label: 'Nhật Bản', value: 'jp', disabled: true },
          ]}
          value={country}
          onChange={setCountry}
          error={country === '' ? 'Bạn phải chọn quốc gia' : undefined}
        />
      </div>
    </div>
  );
}
