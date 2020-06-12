export const formatNetworkErrorMessages = (errorMessage: string) =>
  errorMessage.replace('GraphQL error:', '').trim()
