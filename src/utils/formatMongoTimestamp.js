export const formatMongoTime = (mongoTimestamp) => {
  const date = new Date(mongoTimestamp);

  return date
    .toISOString()
    .slice(0, 16)
    .replace("T", " ")
};
