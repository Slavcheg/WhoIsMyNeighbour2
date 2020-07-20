import { Instance, SnapshotOut, types, applySnapshot } from "mobx-state-tree"
import { MCountry } from "../country.model"
import { Api } from "../../services/api"
import { values } from "mobx"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    countries: types.array(MCountry)
    // countries: types.array()
})
.actions(self => ({
    async loadCountries(){
        const countriesAPI = new Api()
        countriesAPI.setup()
        const countriess = await countriesAPI.getCountries().then((result: any) => {
             return result.countries
        })   
        applySnapshot(self, {countries: countriess})
    }
}))
.views(self => ({
    getCountry(alpha3code){
       const country = self.countries.find(country => country.alpha3Code === alpha3code) || 'NaN'
    //    console.log(country)
    return country
    },

    findCountriesByTerm(term: string){
            return self.countries
                .filter(country => country.name.toLowerCase().includes(term))
                .map(country => country.name)
    },

    findCountriesBetweenTimezones(startZone: any, endZone: any){
        startZone = +startZone.slice(3,6)
        endZone = +endZone.slice(3,6)


        const isBetweenTimezones = (zones: number[]): boolean => {
            let countryFallsBetweenTimezones: boolean = true
            zones.map(zone => {                
                if(!(startZone < zone && zone < endZone)){
                    countryFallsBetweenTimezones = false
                }
            })
            return countryFallsBetweenTimezones
        }

        let countriesBetween = self.countries.filter(country => isBetweenTimezones(country.timezones.map(zone => +zone.slice(3,6))))
        return countriesBetween.map(country => country.name)
    },

    findNeighbours(alpha3code): string[]{
        return self.countries.find(country => country.alpha3Code === alpha3code).borders
    },

    findNeighboursOfNeighbours(alpha3code): string[]{
        let neighboursOfNeighbours: string[] = []
        let neighbours = values(this.findNeighbours(alpha3code))
        neighbours
            .map(neighbour => {
                values(this.findNeighbours(neighbour))
                    .map(el => {
                        neighboursOfNeighbours.push(el)
                    })
            })
            
        // remove duplicates
        neighboursOfNeighbours = neighboursOfNeighbours.filter((a,b) => neighboursOfNeighbours.indexOf(a) === b)

        // remove neighbours of target country and target country itself
        neighboursOfNeighbours = neighboursOfNeighbours.filter(countryCode => !neighbours.includes(countryCode))
        neighboursOfNeighbours = neighboursOfNeighbours.filter(countryCode => countryCode !== alpha3code)
        
        return neighboursOfNeighbours
    },

    findClosestNonNeighbour(alpha3code){
        const distances: {
            countryCode: string,
            distanceFromTarget: number 
        }[] = []
        
        this.findNeighboursOfNeighbours(alpha3code)
            .map(country3code => {
                distances.push({
                    countryCode: country3code,
                    distanceFromTarget: this.getDistanceByAlpha3Code(alpha3code, country3code)
                })
            })
        distances.sort((a,b) => a.distanceFromTarget - b.distanceFromTarget)
        // console.log(distances)
        return distances[0]
    },

    getDistanceByLatLong(lat1, lon1, lat2, lon2){
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = Math.round((R * c)/1000); // in km

        return d
    },

    getDistanceByAlpha3Code(country1, country2){
        const lat1 = self.countries.find(country => country.alpha3Code === country1).latlng[0]
        const lon1 = self.countries.find(country => country.alpha3Code === country1).latlng[1]
        const lat2 = self.countries.find(country => country.alpha3Code === country2).latlng[0]
        const lon2 = self.countries.find(country => country.alpha3Code === country2).latlng[1]

        return this.getDistanceByLatLong(lat1, lon1, lat2, lon2)
    },

    
}))
/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
