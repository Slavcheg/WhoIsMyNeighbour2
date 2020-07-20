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
    }
}))
/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
