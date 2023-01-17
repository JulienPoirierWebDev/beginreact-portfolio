import {useCallback, useEffect, useReducer} from "react";
import {useIsMounted} from "./useIsMounted";

export const FETCH_ACTIONS = {
    IDLE:"idle",
    PENDING:"pending",
    RESOLVED:'resolved',
    REJECTED:'rejected'
}

const fetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_ACTIONS.IDLE :
            return {status:FETCH_ACTIONS.IDLE,data:null, error:null}
        case FETCH_ACTIONS.PENDING :
            return {status: FETCH_ACTIONS.PENDING,data:null, error: null}
        case FETCH_ACTIONS.RESOLVED:
            return {status: FETCH_ACTIONS.RESOLVED,data:action.data, error:null}
        case FETCH_ACTIONS.REJECTED:
            return {status:FETCH_ACTIONS.REJECTED,data:null,error : action.error}
        default:
            throw new Error(`This action doesn't exist :${action.type}` )
    }

}

export const useFetch = (url, config) => {

    const [projects, dispatch] = useReducer(fetchReducer, {status:FETCH_ACTIONS.IDLE, data:null})

    const isMounted = useIsMounted();

    const run = useCallback(() => {
        fetch(url, config).then((res) => {

            dispatch({type:FETCH_ACTIONS.PENDING})
            return res.json()
        }).then((data) => {
            if(!isMounted()) {
                return;
            }
            if(data) {
                dispatch({type:FETCH_ACTIONS.RESOLVED, data})
            }
        }).catch((err) => {
            if(!isMounted()) {
                return;
            }
            dispatch({type:FETCH_ACTIONS.REJECTED, error: err})
        })
    }, [config, url, isMounted])

    useEffect(() => {
        run()
    }, [url, config, run])

    return [projects];
}
