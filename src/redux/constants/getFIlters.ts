export const getFilters = (filters: any) => {
  let query = "";
  for (const key in filters) {
    query += `${key}=${filters[key]}&`;
  }

  return query.substring(0, query.length - 1);
};
