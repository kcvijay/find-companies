import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {
  json,
  Outlet,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';
import SearchIcon from '~/components/icons/SearchIcon';

export const meta: MetaFunction = () => {
  return [
    { title: 'Search companies in Finland' },
    {
      name: 'description',
      content:
        'Get contact details of all private and public companies registered in Finland',
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const searchTerm = formData.get('q') as string;
  const searchType = formData.get('queryType') as string;
  const pageNumber = 1;

  if (searchTerm === '') {
    return json({ error: 'Search term cannot be empty' }, { status: 400 });
  }

  if (searchType === 'name') {
    return redirect(
      `/search/result?queryType=name&name=${searchTerm}&page=${pageNumber}`
    );
  } else if (searchType === 'businessId') {
    return redirect(
      `/search/result?queryType=businessId&businessId=${searchTerm}&page=${pageNumber}`
    );
  } else {
    return json({ error: 'Invalid search type' }, { status: 400 });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = new URL(request.url).searchParams;
  const query = params.get('name') || '';
  return { searchTerm: query };
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const isFetching = fetcher.state !== 'idle';

  return (
    <div className='max-w-4xl mx-auto flex flex-col'>
      <div>
        <header className='text-center'>
          <h1 className='text-xl md:text-3xl font-bold text-sky-600'>
            Companies of Finland
          </h1>
          <p>Search for company details registered in Finland</p>
        </header>

        <section className='mt-8'>
          <fetcher.Form
            method='post'
            className='h-12 mt-6 flex justify-between items-center  border border-sky-200 focus-within:inset-4 focus-within:border-sky-500'
          >
            <div className='h-full'>
              <select
                name='queryType'
                id='queryType'
                defaultValue='name'
                className='h-full p-2 bg-sky-100 focus:outline-none'
              >
                <option value='name'>Name</option>
                <option value='businessId'>Business ID</option>
              </select>
            </div>
            <div className='w-full h-full grow'>
              <input
                type='text'
                id='q'
                name='q'
                className='flex-1 px-4 h-full w-full focus:outline-none'
                placeholder='Search for a company'
                defaultValue={loaderData.searchTerm}
                required
              />
            </div>
            <button
              type='submit'
              className='block px-4 bg-sky-500 h-full text-white hover:bg-sky-600 transition-all'
            >
              <SearchIcon className='size-5' />
            </button>
          </fetcher.Form>
          {actionData?.error && <p>{actionData.error}</p>}
        </section>
        {isFetching ? (
          <div className='text-center my-12'>
            <p className='animate-pulse text-lg text-slate-700'>
              Searching companies...
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

// export const ErrorBoundary = () => {
//   const error = useRouteError();
//   return (
//     <div className='p-6 bg-red-50 text-red-600 border border-red-600 mt-6'>
//       <p>{error instanceof Error && error.message}</p>
//     </div>
//   );
// };
