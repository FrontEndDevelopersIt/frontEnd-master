import axios from 'axios'


function postData(url, params, defaultUrl, callback) {
    let msg = '';
    console.log('this', this);
    axios.post(url, params).then(response =>{
        if(response.status >= 200 && response.status < 300)
        {
            msg = response.data.data;
            callback(msg);
            if(response.data.data.token !== null || response.data.data.token !== undefined) {
                localStorage.setItem('JWT', response.data.data.token);
            }else{ reject(error);}
           /* location.href = defaultUrl;*/
        }
    }).catch(error =>{
        switch (error.message){
            case('Request failed with status code 401') :
                msg = 'Wrong password';
                break;
            case('Request failed with status code 403') :
                msg = 'Account was not activated';
                break;
            case('Request failed with status code 404') :
                msg = 'Wrong email';
                break;
            case('Request failed with status code 422') :
                msg = 'Invalid user data';
                break;
            case('Request failed with status code 500') :
                msg = 'Undeclared error';
                break;
            default:
                msg = 'Something wrong!!!';
        }
        callback(msg);
        console.log(error.data);
    });
}

function getData(url, params, defaultUrl, callback){
    let msg = '';
    axios.get(url, params).then(response=>{
        switch(response.status) {
            case(200) :
                msg = response.data.data;
                break;
            case(202) :
                msg = response.data.data;
                break;
        }
        callback(msg);
        if(response.status >=200 && response.status < 300)
        {
            if(response.data.data.token)
            {
                localStorage.setItem('JWT', response.data.data.token);
            }
            //location.href = defaultUrl;

        }
    }).catch(error=>{
        switch (error.message)
        {
            case('Request failed with status code 400') :
                msg = 'Bad request';
                break;
            case('Request failed with status code 401') :
                msg = 'Token expired or blacklisted';
                break;
            case('Request failed with status code 404') :
                msg = 'Not found';
                break;
            case('Request failed with status code 422') :
                msg = 'Invalid user data';
                break;
            default:
                msg = 'Something wrong';
        }
            callback(msg);

    }
    );
    return msg;
}

/**
 * @return {string}
 */
function PatchData(url, params,defaultUrl, callback){
    let msg = '';
    axios.patch(url,params).then(response=>
    {
        switch (response.status) {
            case(204) :
                msg = response.data.data;
                break;
        }
        callback(msg);
        if(response.status >=200 && response.status < 300)
        {
            location.href = defaultUrl;
        }
    }).catch(error =>
    {
        switch (error.message) {
            case('Request failed with status code 400') :
                msg = 'Provided data is invalid and can not be used (validator error) / Token absent or invalid';
                break;
            case('Request failed with status code 401') :
                msg = 'Token expired or blacklisted';
                break;
            default:
                msg = 'Something wrong';
        }
        callback(msg);

    });
    return msg;
}

/**
 * @return {string}
 */
function DeleteData(url, params, callback) {
    let msg = '';
    axios.delete(url,params).then(response=>
    {
        switch (response.status) {
            case(204) :
                msg = 'Success';
                break;

        }
        callback(msg);
    }).catch(error =>
    {
        switch (error.message) {
            case('Request failed with status code 404') :
                msg = 'Not Found';
                break;
            default:
                msg = 'Something wrong';
        }
        callback(msg);
    });
    return msg;
}

export  default {
    postData,
    getData,
    PatchData,
    DeleteData
}
