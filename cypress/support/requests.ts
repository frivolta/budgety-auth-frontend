// Signup
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

// Signin
export const SIGNIN_REQUEST_SUCCESS = {
  data: {
    login: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2I1ZDRyaWEwMDBmMDcxMDRraGIwbXRoIiwiaWF0IjoxNTkyNzQ3ODUxfQ.rHufMsRVsMwYj4Jur15koiiqVnHEQ0680HO9un4Gcuo',
      user: {
        id: 'ckb5d4ria000f07104khb0mth',
        email: 'rivoltafilippo3@gmail.com',
        __typename: 'User',
      },
      __typename: 'AuthPayload',
    },
  },
}

export const SIGNIN_REQUEST_REJECT = {
  data: null,
  errors: [
    {
      message: 'No such user found for email:',
      locations: [{ line: 2, column: 3 }],
      path: ['login'],
    },
  ],
}
