export const getRequest = (url, params) => {
    
    return new Promise( (resolve, reject) => {
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState === 4 && req.status === 200) {
                resolve(JSON.parse(req.responseText));
            }
        };
        
        url = url + "?";
        for(let prop in params) {
            url += prop + "=" + params[prop] + "&";
        };
        req.open("GET", url, true);
        req.send();
        
    });
}


export const putRequest = (url, params) => {
    
    return new Promise( (resolve, reject) => {
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState === 4 && req.status === 200) {
                resolve(JSON.parse(req.responseText));
            }
        };
        
        let json = JSON.stringify(params);

        req.open("PUT", url, true);
        req.setRequestHeader('Content-type','application/json; charset=utf-8');
        req.send(json);
        
    });
    
}