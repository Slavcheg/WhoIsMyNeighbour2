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
    getCountry(){
        return values(self.countries[0].topLevelDomain)
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

        console.log(d)
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
