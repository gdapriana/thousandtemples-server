import ResponseError from "../error/response-error";

export default function validate(schema, request) {
  const result = schema.validate(request, {
    abortEarly: true,
    allowUknown: false
  })

  if (result.error) {
    throw new ResponseError(400, result.error.message)
  } else {
    return result.value;
  }
}
