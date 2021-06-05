import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImageData {
  data: {
    title: string;
    url: string;
    description: string;
    ts: number;
    id: string;
  };
}

export default function Home(): JSX.Element {
  async function fetchImages({
    pageParam = null,
  }: QueryFunctionContext<'images', any>): Promise<ImageData> {
    const response = await api.get<ImageData>('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.after;
    },
  });

  const formattedData = useMemo(() => {
    if (!data) return [];

    return data.pages.map(page => page.data).flat();
  }, [data]);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="10"
            onClick={() => fetchNextPage()}
            opacity={isFetchingNextPage ? 0.5 : 1}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
