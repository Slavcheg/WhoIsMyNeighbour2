import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getCountries() {
    const response: ApiResponse<any> = await this.apisauce.get(`/all`)
    
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const mapCountries = raw => {
      return {        
        name: raw.name,
        topLevelDomain: raw.topLevelDomain,
        alpha2Code : raw.alpha2Code,
        alpha3Code : raw.alpha3Code,
        callingCodes : raw.callingCodes,
        capital : raw.capital,
        altSpellings : raw.altSpellings,
        region : raw.region,
        subregion : raw.subregion,
        population : raw.population,
        latlng : raw.latlng,
        demonym : raw.demonym,
        area : raw.area || 0,
        // gini : raw.gini,
        timezones : raw.timezones,
        borders : raw.borders,
        nativeName : raw.nativeName,
        numericCode : raw.numericCode || '',
      }
    }

    try {
      const rawCountries = response.data
      const resultCountries = rawCountries.map(mapCountries)
      return { kind: "ok", countries: resultCountries }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
