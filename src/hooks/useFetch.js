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

    const [state, dispatch] = useReducer(fetchReducer, {
        status:FETCH_ACTIONS.IDLE,
        data:null,
        error:null
    })

    const isMounted = useIsMounted();

    const {data, error, status} = state;

    const run = useCallback(() => {
        fetch(url, config).then(async (res) => {
            dispatch({type: FETCH_ACTIONS.PENDING})
            const json = await res.json();

            if (!isMounted()) {
                return;
            }

            if (res.ok) {
                dispatch({type: FETCH_ACTIONS.RESOLVED, data:json})
            } else {
                dispatch({type:FETCH_ACTIONS.REJECTED, error:json})
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

    return {
        error,
        status,
        data,
        run
    }
}
