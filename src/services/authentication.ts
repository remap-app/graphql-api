import { STATUS_CODES } from 'http'
import fetch, { RequestInit, Response } from 'node-fetch'
import { createError } from 'micro-errors'
import { throwInternalServerError } from './helpers'

const { AUTHENTICATION_ENDPOINT = '' } = process.env

export default async (idToken: string): Promise<IAuthentication> => {
  const res: Response = await fetch(
    AUTHENTICATION_ENDPOINT,
    {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
      mode: 'cors',
    } as RequestInit
  )

  if (res.ok) {
    return await res.json().catch(throwInternalServerError)
  }

  throw createError(res.status, STATUS_CODES[res.status])
}
