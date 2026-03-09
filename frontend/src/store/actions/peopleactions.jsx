import React from 'react'

import axios from "../../utlis/axios" 
import {loadperson} from "../reducers/personslice"
export {removeperson} from "../reducers/personslice"


export const asyncloadperson= (id) => async (dispatch, getState) =>{
    try {
        const detail = await axios.get(`/person/${id}`)
        console.log(detail)
        const externalid = await axios.get(`/person/${id}/external_ids`)
        const combinedcredits = await axios.get(`/person/${id}/combined_credits`)

        const tv = await axios.get(`/person/${id}/tv_credits`)
        const movie = await axios.get(`/person/${id}/movie_credits`)
        
       
        let theultimatedetails = {
            detail : detail.data, 
            externalid :externalid.data,
            combinedcredits:  combinedcredits.data,
            tv: tv.data,
            movie: movie.data,
           
        }
        

        dispatch(loadperson(theultimatedetails))
        console.log(theultimatedetails)
        
    } catch (error) {
        console.log("ERROR", error)
        
    }
}
