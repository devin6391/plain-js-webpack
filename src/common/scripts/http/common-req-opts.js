import { commonHeaders } from "./common-headers"

export let commonReqOptions = {
  method: "GET",
  credentials: 'same-origin',
  headers: commonHeaders,
  mode: "cors",
  cache: "default"
}
