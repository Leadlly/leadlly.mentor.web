"use client"
import React, { useState, useEffect } from 'react';
import Header from '@/components/shared/Header';
import WeekPicker from './components/weekpicker';
import Plannercontent from './components/Plannercontent';
import { usePathname } from 'next/navigation';
import { getplanner } from '@/actions/user_actions';

interface Planner {
  days: any[]; // Update 'any[]' to the actual type of the days array if known
  // Add other properties of the planner object if needed
}

export default function Page() {
  const [planner, setPlanner] = useState<Planner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const segments = pathname.split('/');
        const id = segments[segments.length - 2];
        console.log(id);
        const data = await getplanner(id);
        console.log(data);
        setPlanner(data.data);
        setLoading(false);
      } catch (err) {
        console.error((err as Error).message);
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchPlanner();
  }, [pathname]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex flex-col justify-start h-[calc(100dvh-120px)] gap-3 md:pt-0'>
      <div className='md:bg-[#E8DAFE] md:shadow-none shadow-md shadow-inner-outer pl-[14px] md:pl-[0px] py-[2%] px-[1.8%] md:rounded-[7px] flex md:flex justify-between items-center'>
        <Header
          title="Planner"
          titleClassName="text-[24px] md:text-3xl lg:text-[30px]"
        />
        <WeekPicker />
      </div>
      {planner && planner.days && <Plannercontent weekstopic={planner.days} />}
    </div>
  );
}
