import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import LoadingSearchModal from '@/components/navbar/search/LoadingSearchModal'
import searchAddress from '@/components/navbar/search/searchAddress'
import searchHandle from '@/components/navbar/search/searchHandle'


const searchFeature = [
  { id: 1, base: 'handle: ', func: searchHandle },
  { id: 2, base: 'address: ', func: searchAddress },
  { id: 3, base: 'community: ', func: ({ query }) => `/communities/${query}` },
  { id: 4, base: 'hashtag: ', func: ({ query }) => `/hastag/${query}` },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Search() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Loading search')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate();

  async function onSubmit({ query, feature }) {
    setIsLoading(true);
    const result = await feature.func({ query, setMessage, setIsError });
    if (result) {
      setIsLoading(false);
      setMessage("Loading search");
      navigate(result);
    }
  }

  return (
    <div className="w-full">
      <div className="relative">
        <Combobox as="div" value={query} onChange={(text) => onSubmit(text)}>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Combobox.Input
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by handle, address, community or hashtag"
            />

            {query.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {searchFeature.map((feature) => (
                  <Combobox.Option
                    key={feature.id}
                    value={{ query, feature }}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      )
                    }
                  >
                    <span className="text-xs font-light">Search for </span>
                    <span className="text-xs font-medium">{feature.base}</span>
                    <span className="text-xs font-light">{query}</span>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </div>
      <LoadingSearchModal
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        message={message}
        isError={isError}
        setIsError={setIsError}
      />
    </div>
  )
}

export default Search;