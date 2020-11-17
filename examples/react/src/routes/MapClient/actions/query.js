/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:33:32 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-07-30 15:00:11
 */

const FEATURE_TYPE_LOADED = 'FEATURE_TYPE_LOADED';
const FEATURE_LOADED = 'FEATURE_LOADED';
const FEATURE_TYPE_ERROR = 'FEATURE_TYPE_ERROR';
const FEATURE_ERROR = 'FEATURE_ERROR';
const QUERY_RESULT = 'QUERY_RESULT';
const QUERYALL_RESULT = 'QUERYALL_RESULT';
const QUERY_ERROR = 'QUERY_ERROR';
const QUERY_ONFOCUS = 'QUERY_ONFOCUS';
const RESET_QUERY = 'RESET_QUERY';
const CHANGE_QUERYPAGEINDEX = 'CHANGE_QUERYPAGEINDEX';
const HOVER_RESULTINDEX = 'HOVER_RESULTINDEX';
const CLICK_RESULTINDEX = 'CLICK_RESULTINDEX';
const CHANGE_QUERYKEY = 'CHANGE_QUERYKEY';
const CHANGE_QUERYAREAKEY = 'CHANGE_QUERYAREAKEY';
const QUERY_SIMPLERESULT = 'QUERY_SIMPLERESULT';
const COLLAPSE_RESULT = 'COLLAPSE_RESULT';
const CURRENT_RESPONSE_TIME='CURRENT_RESPONSE_TIME';
const QUERY_THEMATIC_RESULT='QUERY_THEMATIC_RESULT';
const CHNAGE_THEMATICLAYERS='CHNAGE_THEMATICLAYERS';
const SHOW_THEMATICDETAIL='SHOW_THEMATICDETAIL';
const SHOW_THEMATICHIGHLIGHT='SHOW_THEMATICHIGHLIGHT';
const SELECT_FAREN='SELECT_FAREN';
const axios = require('axios');
import axiosTiming from '../../../utils/axiostime';
import {
    message
} from 'antd';
import {
    geojsonToArcGIS,
    arcgisToGeoJSON
  } from "@esri/arcgis-to-geojson-utils";
let CancelToken = axios.CancelToken;
let cancel;

let currentrestime='';
axiosTiming(axios, timeInMs =>{
    currentrestime=`${timeInMs.toFixed()/1000}秒`
})



function featureTypeLoaded(typeName, featureType) {
    return {
        type: FEATURE_TYPE_LOADED,
        typeName,
        featureType
    };
}

function currentResponseTime(time) {
    return {   
        type: CURRENT_RESPONSE_TIME,
        time}
}
function setSelectFaRenItem(item) {
    return {
        type: SELECT_FAREN,
        item:item
    };
}



function showThematicDetail(value) {
    return {   
        type: SHOW_THEMATICDETAIL,
        value}
}

function thematicHighlight(value) {
    return {   
        type: SHOW_THEMATICHIGHLIGHT,
        value}
}



function featureTypeError(typeName, error) {
    return {
        type: FEATURE_TYPE_ERROR,
        typeName,
        error
    };
}

function featureLoaded(typeName, feature) {
    return {
        type: FEATURE_LOADED,
        typeName,
        feature
    };
}

function featureError(typeName, error) {
    return {
        type: FEATURE_ERROR,
        typeName,
        error
    };
}

function querySearchResponse(result) {
    return {
        type: QUERY_RESULT,
        result
    };
}

function queryThematicResponse(result) {
    return {
        type: QUERY_THEMATIC_RESULT,
        result
    };
}

function querySearchAllResponse(result) {
    return {
        type: QUERYALL_RESULT,
        result
    };
}

function simpleQuerySearchResponse(simpleresult) {
    return {
        type: QUERY_SIMPLERESULT,
        simpleresult
    };
}


function changeQueryPageIndex(pageindex) {
    return (dispatch, getState) => {
        const querypramas = getState().query;
        dispatch({
            type: CHANGE_QUERYPAGEINDEX,
            pageindex
        });
        if (querypramas.type === 'name') {
            dispatch(query());
        } else {
            dispatch(onHotQuery());
        }

    }

}

function onHoverResult(hoverid) {
    return (dispatch) => {
        dispatch({
            type: HOVER_RESULTINDEX,
            hoverid
        });
    }

}

function onClickResult(clickid,keyword) {
    return (dispatch,getState) => {
        const querypramas = getState().query;
        dispatch({
            type: CLICK_RESULTINDEX,
            clickid
        });
        // const key=keyword||querypramas.key
        // axios.get(ServerUrl + '/gateway/map/hotCount/heat?keyword=&&id='+clickid).then((response) => {
        //     console.info(response);
        // }).catch((e) => {
        //  console.info(e);
        // });
    }

}




function queryError(error) {
    return {
        type: QUERY_ERROR,
        error
    };
}

function describeFeatureType(baseUrl, typeName) {
    return (dispatch) => {
        return axios.get(baseUrl + '?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=' + typeName + '&outputFormat=application/json').then((response) => {
            if (typeof response.data === 'object') {
                dispatch(featureTypeLoaded(typeName, response.data));
            } else {
                try {
                    JSON.parse(response.data);
                } catch (e) {
                    dispatch(featureTypeError(typeName, 'Error from WFS: ' + e.message));
                }

            }

        }).catch((e) => {
            dispatch(featureTypeError(typeName, e));
        });
    };
}

function loadFeature(baseUrl, typeName) {
    return (dispatch) => {
        return axios.get(baseUrl + '?service=WFS&version=1.1.0&request=GetFeature&typeName=' + typeName + '&outputFormat=application/json').then((response) => {
            if (typeof response.data === 'object') {
                dispatch(featureLoaded(typeName, response.data));
            } else {
                try {
                    JSON.parse(response.data);
                } catch (e) {
                    dispatch(featureError(typeName, 'Error from WFS: ' + e.message));
                }

            }

        }).catch((e) => {
            dispatch(featureError(typeName, e));
        });
    };
}

function find_duplicate_in_array(data, attr) {
    var object = {};
    var result = [];

    data.docs.forEach(function (item) {
        if (!object[item[attr]])
            object[item[attr]] = 0;
        object[item[attr]] += 1;
    })

    for (var prop in object) {
        if (object[prop] >= 2) {
            result.push(prop);
        }
    }

    return result;

}

function addSmallClassAttr(data) {
    let dupattrs = find_duplicate_in_array(data, 'name');
    if (dupattrs.length > 0) {
        dupattrs.forEach(attr => {
            data.docs.map(element => {
                if (element.name === attr) {
                    element.duplicate = true
                }
                return element
            });
        });
    }
    return data;
}

function query(key) {

    return (dispatch, getState) => {
        const query = getState().query;
        if (!key && !query.key) {
            return;
        }
        const mapConfig = getState().mapConfig;
        if (cancel != undefined) {
            cancel();
        }
        return axios.get(mapConfig.solrurl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: {
                q: (key || query.key),
                indent: 'on',
                df: 'text',
                wt: 'json',
                start: (query.pageindex - 1) * query.page,
                rows: query.page
            }
        }).then((response) => {
            
            dispatch(clearSimpleResult());
            dispatch(querySearchResponse(addSmallClassAttr(response.data.response)));
            dispatch(queryall(key || query.key));
        }).catch((e) => {
            message.warning('数据查询失败,请稍后再试');
            dispatch(queryError(e));
        });
    };
}


function queryThematic(key) {

    return (dispatch, getState) => {
        const query = getState().query;
        if (!key && !query.key&&!query.thematiclayers) {
            return;
        }
        const mapConfig = getState().mapConfig;
        if (cancel != undefined) {
            cancel();
        }
        return axios.get(mapConfigJson.mapserverurl+"/find", {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: {
                searchText: (key || query.key),
                layers: query.thematiclayers.map(e=>e.value).join(','),
                returnGeometry: true,
                contains:true,
                f: 'json'
            }
        }).then((response) => {
            const list=response.data.results.map(el => {
                let geojson=arcgisToGeoJSON(el);
                geojson.layerId=el.layerId;
                geojson.layerName=el.layerName;
                geojson.displayFieldName=el.displayFieldName;
                geojson.foundFieldName=el.foundFieldName;
                geojson.value=el.value;
                return geojson
            });
            
            dispatch(queryThematicResponse(list));
        }).catch((e) => {
            message.warning('数据查询失败,请稍后再试');
            dispatch(queryError(e));
        });
    };
}



function queryall(key) {

    return (dispatch, getState) => {
        const query = getState().query;
        const mapConfig = getState().mapConfig;
        if (cancel != undefined) {
            cancel();
        }
        return axios.get(mapConfig.solrurl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: {
                q: 'name:' + (key || query.key),
                indent: 'on',
                df: 'text',
                wt: 'json',
                start: (query.pageindex - 1) * query.page,
                rows: 200
            }
        }).then((response) => {
            
            
            dispatch(querySearchAllResponse(response.data.response));
        }).catch((e) => {
            message.warning('数据查询失败,请稍后再试');
            dispatch(queryError(e));
        });
    };
}






function onHotQuery(leve, type, model) {
    return (dispatch, getState) => {
        const query = getState().query;
        const mapConfig = getState().mapConfig;
        if (cancel != undefined) {
            cancel();
        }
        let params = {
            q: (leve || query.type) + ':' + (type || query.key),
            indent: 'on',
            df: 'text',
            wt: 'json',
            start: (query.pageindex - 1) * query.page,
            rows: query.page
        };
        if (model === 'fq') {
            params.fq = leve + ':' + type;
            if (!type) {
                delete params.fq;
            }
            if (!query.key) {
                return;
            }
            params.q = query.type + ':' + query.key
        }


        return axios.get(mapConfig.solrurl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: params
        }).then((response) => {
            dispatch(onHotQueryAll(leve, type, model));
            dispatch(querySearchResponse(addSmallClassAttr(response.data.response)));
            
        }).catch((e) => {
            message.warning('数据查询失败,请稍后再试');
            dispatch(queryError(e));
        });
    };
}

function onHotQueryAll(leve, type, model) {
    return (dispatch, getState) => {
        const query = getState().query;
        const mapConfig = getState().mapConfig;
        if (cancel != undefined) {
            cancel();
        }
        let params = {
            q: (leve || query.type) + ':' + (type || query.key),
            indent: 'on',
            df: 'text',
            wt: 'json',
            start: (query.pageindex - 1) * query.page,
            rows: 300
        };
        if (model === 'fq') {
            params.fq = leve + ':' + type;
            if (!type) {
                delete params.fq;
            }
            params.q = query.type + ':' + query.key
        }


        return axios.get(mapConfig.solrurl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: params
        }).then((response) => {
            dispatch(currentResponseTime(currentrestime));
            dispatch(querySearchAllResponse(response.data.response));
        }).catch((e) => {
             message.warning('数据查询失败,请稍后再试');
            dispatch(queryError(e));
        });
    };
}






function simpleQuery(key) {

    return (dispatch, getState) => {
        if (key.trim() === '') {
            dispatch(simpleQuerySearchResponse([]));
            return;
        }
        const mapConfig = getState().mapConfig;
        if (cancel != undefined) {
            //取消上一次请求
            cancel();
        }
        return axios.get(mapConfig.solrurl, {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            params: {
                indent: 'on',
                q: key,
                df: 'text',
                wt: 'json',
                start: 0,
                rows: 6
            }
        }).then((response) => {
            dispatch(simpleQuerySearchResponse(addSmallClassAttr(response.data.response).docs));
        }).catch((e) => {
            dispatch(queryError(e));
        });
    };
}

function resetQuery() {
    return (dispatch) => {
        dispatch({
            type: RESET_QUERY,
        });

        dispatch(collapseResult(false))
    }
}

function collapseResult(collapse) {

    return {
        type: COLLAPSE_RESULT,
        collapse
    }

}

function changeQueryKey(key, querytype) {
    return {
        type: CHANGE_QUERYKEY,
        key,
        querytype
    }
}

function changeThematicLayers(layers) {
    return {
        type: CHNAGE_THEMATICLAYERS,
        layers
    }
    
}

function clearSimpleResult() {
    return {
        type: QUERY_SIMPLERESULT,
        simpleresult: []
    };
}



function changeQueryAreaKey(key, querytype) {
    return {
        type: CHANGE_QUERYAREAKEY,
        key,
        querytype
    }
}

function queryOnFocus(inputfocus) {

    return (dispatch, getState) => {
        const query = getState().query;
        dispatch({
            type: QUERY_ONFOCUS,
            inputfocus
        });
        // if (!query.result) {
        //     dispatch(showSidebar(true, '1'))
        // }

    }


}

export{
    FEATURE_TYPE_LOADED,
    FEATURE_LOADED,
    FEATURE_TYPE_ERROR,
    FEATURE_ERROR,
    changeThematicLayers,
    CHNAGE_THEMATICLAYERS,
    changeQueryPageIndex,
    CHANGE_QUERYPAGEINDEX,
    querySearchAllResponse,
    QUERYALL_RESULT,
    QUERY_RESULT,
    QUERY_ERROR,
    changeQueryKey,
    CHANGE_QUERYKEY,
    CHANGE_QUERYAREAKEY,
    changeQueryAreaKey,
    QUERY_ONFOCUS,
    RESET_QUERY,
    collapseResult,
    COLLAPSE_RESULT,
    onHoverResult,
    onHotQuery,
    simpleQuery,
    queryThematic,
    QUERY_SIMPLERESULT,
    CURRENT_RESPONSE_TIME,
    clearSimpleResult,
    HOVER_RESULTINDEX,
    CLICK_RESULTINDEX,
    showThematicDetail,
    thematicHighlight,
    SHOW_THEMATICHIGHLIGHT,
    SHOW_THEMATICDETAIL,
    onClickResult,
    describeFeatureType,
    loadFeature,
    queryThematicResponse,
    QUERY_THEMATIC_RESULT,
    queryOnFocus,
    setSelectFaRenItem,
    SELECT_FAREN,
    query,
    resetQuery
};