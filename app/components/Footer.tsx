import { Link } from '@remix-run/react';

export default function Footer() {
  return (
    <footer className='h-36 bg-slate-200/50 p-6'>
      <div>
        <h2 className='text-xl text-slate-600 font-bold'>SC</h2>
        <p className='text-sm'>
          Copyright &copy; &mdash; {new Date().getFullYear()}{' '}
          <Link
            to='https://github.com/kcvijay'
            target='_blank noreferer'
            className='hover:underline'
          >
            Vijay K.C.
          </Link>
        </p>
      </div>
      <p className='text-sm mt-4'>
        Resources from{' '}
        <Link
          to='https://prh.fi'
          target='_blank noreferer'
          className='hover:underline'
        >
          PRH
        </Link>
      </p>{' '}
    </footer>
  );
}
