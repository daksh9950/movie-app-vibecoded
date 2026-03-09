import React from 'react'

import axios from "../../utlis/axios" 
import { loadtv } from '../reducers/Tvslice' 
export {removetv} from "../reducers/Tvslice"

export const asyncloadtv= (id) => async (dispatch, getState) =>{
    try {
        const detail = await axios.get(`/tv/${id}`)
        const externalid = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const translations = await axios.get(`/tv/${id}/translations`)
        const videos = await axios.get(`/tv/${id}/videos`)
        console.log(videos)
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`)
        let theultimatedetails = {
            detail : detail.data, 
            externalid :externalid.data,
            recommendations :recommendations.data.results,
            similar :similar.data.results,
            translations :translations.data.translations.map((t)=>t.name),
            videos :videos.data.results.find((m) => m.type === "Trailer" && m.site === "YouTube" ),
            watchproviders :watchproviders.data.results.IN,
        }

        dispatch(loadtv(theultimatedetails))
        console.log(theultimatedetails)
        
    } catch (error) {
        console.log("ERROR", error)
        
    }
}
