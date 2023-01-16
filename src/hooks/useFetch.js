/* GitHub Repository - Exercise */
import {getListOfUrlRepositoriesUrl} from "../lib/api-url";
import {GITHUB_USERNAME} from "../lib/config";
import {useEffect, useReducer} from "react";

export const FETCH_ACTIONS = {
    IDLE:"idle",
    PENDING:"pending",
    RESOLVED:'resolved',
    REJECTED:'rejected'
}

const fetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_ACTIONS.IDLE :
            return {status:FETCH_ACTIONS.IDLE,data:{}}
        case FETCH_ACTIONS.PENDING :
            return {status: FETCH_ACTIONS.PENDING,data:{}}
        case FETCH_ACTIONS.RESOLVED:
            return {status: FETCH_ACTIONS.RESOLVED,data:action.data}
        case FETCH_ACTIONS.REJECTED:
            return {status:FETCH_ACTIONS.REJECTED,data:{}}
        default:
            throw new Error("This action doesn't exist.")
    }

}

export const useFetch = () => {

    const [projects, dispatch] = useReducer(fetchReducer, {status:FETCH_ACTIONS.IDLE, data:{}})




    useEffect(() => {
        console.log("projets")
        fetch(getListOfUrlRepositoriesUrl(GITHUB_USERNAME)).then((res) => {

            dispatch({type:FETCH_ACTIONS.PENDING})
            return res.json()
        }).then((data) => {
            if(data) {
                dispatch({type:FETCH_ACTIONS.RESOLVED, data})
            }
        }).catch((err) => {
            dispatch({type:FETCH_ACTIONS.REJECTED})
            console.log(err)
        })
    }, [])

    return [projects, dispatch];
}
