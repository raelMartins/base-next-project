export const convertToQuery = (queryObj: Record<string, unknown> | null | undefined): string => {
  const queries = new URLSearchParams();

  if (!queryObj) {
    return "";
  }

  Object.entries(queryObj).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          queries.append(key, String(item));
        }
      });
    } else {
      queries.append(key, String(value));
    }
  });

  const queryString = queries.toString();
  return `${queryString ? "?" : ""}${queryString}`;
};

export const parseSearchParamsToObject = (
  searchParams: URLSearchParams | Iterable<[string, string]>,
  acceptableParams?: string[]
): Record<string, string | string[]> => {
  const paramsObject: Record<string, string | string[]> = {};
  const hasAcceptableParams = acceptableParams && acceptableParams.length > 0;
  const entries =
    searchParams instanceof URLSearchParams
      ? searchParams.entries()
      : searchParams;

  for (const [key, value] of entries) {
    if (!hasAcceptableParams || acceptableParams.includes(key)) {
      if (key in paramsObject) {
        const existing = paramsObject[key];
        if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          paramsObject[key] = [existing, value];
        }
      } else {
        paramsObject[key] = value;
      }
    }
  }

  return paramsObject;
};
