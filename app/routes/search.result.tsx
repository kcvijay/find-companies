import { LoaderFunction } from '@remix-run/node';
import { json, useLoaderData, useRouteError } from '@remix-run/react';
import { getDataFromBusinessId, getDataFromName } from '~/data/actions';
import SingleResult from '~/components/SingleResult';
import AllResults from '~/components/AllResults';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const queryType = url.searchParams.get('queryType');
  const name = url.searchParams.get('name');
  const businessId = url.searchParams.get('businessId');
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const resultsFrom = (page - 1) * 10;

  if (queryType === 'name') {
    const data = await getDataFromName(name || '%20', resultsFrom);
    return json(
      {
        data,
        currentPage: page,
        queryType: queryType,
        name: name,
        businessId: businessId,
      },
      { headers: { 'Cache-Control': 'public, max-age=3600' } }
    );
  } else if (queryType === 'businessId') {
    const data = await getDataFromBusinessId(businessId || '%20', resultsFrom);
    return json(
      { data },
      { headers: { 'Cache-Control': 'public, max-age=3600' } }
    );
  } else {
    return json(
      { error: 'No valid query parameters provided' },
      { status: 400 }
    );
  }
};

export default function Index() {
  const { data, currentPage, queryType, name } = useLoaderData<typeof loader>();

  return (
    <div>
      {data && data.results.length === 1 ? (
        <SingleResult data={data} />
      ) : (
        <AllResults
          data={data}
          currentPage={currentPage}
          queryType={queryType}
          name={name}
        />
      )}
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <div className='p-6 bg-red-50 text-red-600 border border-red-600 mt-6'>
      <h1 className='text-lg font-normal'>Oops! Something went wrong!</h1>
      <p>{error instanceof Error && error.message}</p>
    </div>
  );
};
