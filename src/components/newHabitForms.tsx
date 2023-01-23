import { Check } from "phosphor-react";
import * as CheckBox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length == 0) {
      return;
    }

    await api.post('habits', {
      title,
      weekDays,
    });

    setTitle('');
    setWeekDays([]);

    alert("Habito criado com sucesso");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day != weekDay);

      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      >
      </input>

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className='mt-3 flex flex-col gap-3'>
        {availableWeekDays.map((weekDay, index) => {
          return (
            <CheckBox.Root
              key={weekDay}
              className='flex items-center gap-3 group focus:outline-none'
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div
                className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background'
              >
                <CheckBox.Indicator>
                  <Check
                    size={20}
                    className="text-white"
                  />
                </CheckBox.Indicator>
              </div>

              <span
                className='text-white leading-tight'
              >
                {weekDay}
              </span>
            </CheckBox.Root>
          );
        })}

      </div>

      <button type="submit" className="mt-6 rounded-lg p-3 items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colorsn focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
        <Check size={20} width="bold" />
        Confirmar
      </button>

    </form>
  );
}