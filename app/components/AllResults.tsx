import { Link, useLoaderData } from '@remix-run/react';

export default function AllResults({
  data,
  currentPage,
  name,
  queryType,
}: {
  data: any;
  currentPage: number;
  name: string;
  queryType: string;
}) {
  const totalPages = Math.ceil(data.totalResults / 10);
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <div className='w-full mt-6'>
      <div className='flex justify-between items-center'>
        {data.totalResults <= 1 ? (
          <p>Found {data.totalResults} result</p>
        ) : (
          <p>Found {data.totalResults} companies</p>
        )}
        {data.totalResults !== 0 && ( // Hide page count when no results
          <p>
            Page {currentPage} / {totalPages}
          </p>
        )}
      </div>

      <div className='gap-2 mt-4 h-full overflow-y-auto'>
        {data.results.map((item: any) => (
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
        ))}
      </div>
      {data.totalResults > 10 && ( // Hide pagination when less than 10 results
        <div className='flex justify-between items-center mt-6'>
          {currentPage !== 1 ? ( // Hide prev button when on first page
            <Link
              to={`?queryType=${queryType}&name=${name}&page=${prevPage}`}
              className='bg-sky-600 text-white py-2 px-3 border hover:bg-sky-700 transition-all'
            >
              ← Prev
            </Link>
          ) : (
            <div />
          )}

          {currentPage !== totalPages && (
            <Link
              to={`?queryType=${queryType}&name=${name}&page=${nextPage}`}
              className='bg-sky-600 text-white py-2 px-3 border hover:bg-sky-700 transition-all'
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
