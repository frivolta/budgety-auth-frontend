export const SIGNUP_REQUEST_SUCCESS = {
  data: {
    signup: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2JsNjY2YWgwMDBiMDc5OW1uaGkxeWc5IiwiaWF0IjoxNTkyNTA4MDQzfQ.I0Dt9BlHDOie6aNYP-5q5MfYWOXTLxDxnH6WZfI83Ho',
      __typename: 'AuthPayload',
    },
  },
}

export const SIGNUP_REQUEST_REJECTED = {
  data: null,
  errors: [
    {
      message:
        'A unique constraint would be violated on User. Details: Field name = email',
      locations: [{ line: 2, column: 3 }],
      path: ['signup'],
      code: 3010,
      requestId: 'local:ckbjwtmld00200739vgpfo3oe',
    },
  ],
}
