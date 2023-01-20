import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import * as CheckBox from '@radix-ui/react-checkbox';
import { ProgressBar } from './progressBar';
import { Check } from 'phosphor-react';
import { CheckBoxComponent } from './checkBox';
import dayjs from 'dayjs';

interface HabitDayProps {
  date: Date,
  completed?: number,
  amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const completedPorcentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dateAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPorcentage == 0,
          'bg-violet-900 border-violet-700': completedPorcentage > 0 && completedPorcentage < 20,
          'bg-violet-800 border-violet-600': completedPorcentage >= 20 && completedPorcentage < 40,
          'bg-violet-700 border-violet-500': completedPorcentage >= 40 && completedPorcentage < 60,
          'bg-violet-600 border-violet-400': completedPorcentage >= 60 && completedPorcentage < 80,
          'bg-violet-500 border-violet-300': completedPorcentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dateAndMonth}</span>

          <ProgressBar progress={completedPorcentage} />

          <CheckBoxComponent title='Beber 2L de água' />
          <CheckBoxComponent title='Teste' />
          <CheckBoxComponent title='Teste 2' />

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>

    </Popover.Root>
  );
}