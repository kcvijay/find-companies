import { Link } from '@remix-run/react';
import { Item } from '~/data/types';

export default function ResultCard({ item }: { item: Item }) {
  return (
    <Link
      to={`/search/result?queryType=businessId&businessId=${item.businessId}`}
      rel='prefetch'
      key={item.businessId}
      className='p-4 mb-4 flex flex-col gap-2 bg-slate-50/50 border border-sky-200 shadow hover:bg-slate-100 transition-all'
    >
      <span className='inline-block text-xl font-bold text-sky-600'>
        {item.name}
      </span>
      <span className='inline-block font-thin text-sm'>
        Business ID {item.businessId}
      </span>
    </Link>
  );
}
