import { types } from "mobx-state-tree"

export const MCountry = types.model({
    name : types.string,
    topLevelDomain : types.array(types.string),
    alpha2Code : types.string,
    alpha3Code : types.string,
    callingCodes : types.array(types.string),
    capital : types.string,
    altSpellings : types.array(types.string),
    region : types.string,
    subregion : types.string,
    population : types.optional(types.number, 0),
    latlng : types.array(types.number),
    demonym : types.string,
    area : types.optional(types.number, 0),
    gini : types.optional(types.number, 0),
    timezones : types.array(types.string),
    borders : types.array(types.string),
    nativeName : types.string,
    numericCode : types.string,
}
)