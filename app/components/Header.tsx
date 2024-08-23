import { Link } from '@remix-run/react';
import SearchIcon from './icons/SearchIcon';

export default function Header() {
  return (
    <header className='h-12 bg-sky-600 text-white flex items-center p-4 shadow'>
      <Link to='/' className='flex items-center gap-2 text-xl hover:font-bold hover:tracking-wide transition-all'>
        <SearchIcon className='size-6' />
        <span>Search Companies</span>
      </Link>
    </header>
  );
}
