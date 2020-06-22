import { toast } from 'react-toastify'

export const toasterError = (content: string): Promise<React.ReactText> => {
  return new Promise((resolve) => {
    resolve(toast.error(content))
  })
}

export const toasterSuccess = (content: string): Promise<React.ReactText> => {
  return new Promise((resolve) => {
    resolve(toast.success(content))
  })
}

export const toasterInfo = (content: string): Promise<React.ReactText> => {
  return new Promise((resolve) => {
    resolve(toast(content))
  })
}
