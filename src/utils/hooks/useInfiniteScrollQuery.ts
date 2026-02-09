import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

type GetLengthOfListFunction<TQueryFnData> = (
  data: InfiniteData<TQueryFnData> | undefined
) => number;

interface PropInstance<TQueryFnData, TError, TQueryKey extends QueryKey> {
  options: any;
  limit: number;
  getLengthOfList: GetLengthOfListFunction<TQueryFnData>;
  bottomOffset?: number;
  bodyRef?: React.RefObject<HTMLElement>;
}

const useInfiniteScrollQuery = <
  TQueryFnData,
  TError,
  TQueryKey extends QueryKey
>({
  options,
  bottomOffset,
  limit,
  bodyRef,
  getLengthOfList,
}: PropInstance<TQueryFnData, TError, TQueryKey>) => {
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");

  /**
   * FIX: In v5, if you provide TData (3rd arg), it overrides the default InfiniteData shape.
   * To get InfiniteData<TQueryFnData> naturally, we only provide the first two generics
   * and the QueryKey.
   */
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery<
    TQueryFnData,
    TError,
    InfiniteData<TQueryFnData>,
    TQueryKey
  >(options);

  // This will now correctly resolve to InfiniteData<TQueryFnData>
  const lengthOfList = getLengthOfList(infiniteData as any);

  const handleAnimation = useCallback(
    (scrollTop: number) => {
      if (scrollTop > 540 && lengthOfList > limit) {
        setScrollDirection("up");
      } else {
        setScrollDirection("down");
      }
    },
    [lengthOfList, limit]
  );

  const threshold = bottomOffset || 100;

  const handleScroll = useCallback(() => {
    const scrollTarget = bodyRef?.current || window;

    let clientHeight: number;
    let scrollHeight: number;
    let scrollTop: number;

    if (scrollTarget === window) {
      clientHeight = window.innerHeight;
      scrollHeight = document.documentElement.scrollHeight;
      scrollTop = document.documentElement.scrollTop;
    } else {
      const element = scrollTarget as HTMLElement;
      clientHeight = element.clientHeight;
      scrollHeight = element.scrollHeight;
      scrollTop = element.scrollTop;
    }

    const isAtTheBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    const isAtTheTop = scrollTop <= threshold;

    const shouldFetch = scrollDirection === "up" ? isAtTheTop : isAtTheBottom;

    handleAnimation(scrollTop);

    if (!isFetchingNextPage && shouldFetch && hasNextPage) {
      fetchNextPage();
    }
  }, [
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    threshold,
    handleAnimation,
    bodyRef,
    scrollDirection,
  ]);

  useEffect(() => {
    const scrollTarget = bodyRef?.current || window;
    scrollTarget.addEventListener("scroll", handleScroll);
    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, [handleScroll, bodyRef]);

  return {
    scrollDirection,
    infiniteData,
    handleScroll,
    isLoading,
    refetch,
    isError,
    error,
    isFetchingNextPage,
  };
};

export default useInfiniteScrollQuery;
