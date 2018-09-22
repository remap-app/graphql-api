import { STATUS_CODES } from 'http'
import { createError } from 'micro-errors'

export const createInternalServerError = (error: Error) => createError(500, STATUS_CODES[500], error)

export const throwInternalServerError = (error: Error) => {
  throw createInternalServerError(error)
}
