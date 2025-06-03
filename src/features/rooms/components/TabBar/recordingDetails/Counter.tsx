import { formateSecondesToString } from '@/utils/formatters/format_time';
import React, { useEffect, useState } from 'react'

type CounterProps = {
  isCounting: boolean,
}

function Counter({ isCounting }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId : NodeJS.Timeout;
    if (isCounting) {
      intervalId = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    }
  }, [isCounting]);

  return (
    <p className='text-sm text-slate-400 tracking-wider'>{formateSecondesToString(count)}</p>
  )
}

export default Counter