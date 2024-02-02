import Config from '../config.js';

function getPagingData(data, page, limit) {
  const { count: totalItems, rows: items } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage: page, items };
}

function getPaginationInfo(page, limit) {
  // set limit
  limit = parseInt(limit);
  if (!limit || limit <= 0) limit = Config.DEFAULT_NUM_ROWS_PER_QUERY;

  // set page
  page = parseInt(page);
  if (!page || page < 1) page = 1;

  // set offset
  const offset = (page - 1) * limit;

  return { limit, offset, page };
}

export { getPaginationInfo, getPagingData };
