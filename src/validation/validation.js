const validation = (schema, data) => {
  return schema.parse(data);
};

export default validation;
