export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    console.log("Slicing:", items.slice(startIndex, startIndex + pageSize));
    return items.slice(startIndex, startIndex + pageSize); // 0, 9
  };