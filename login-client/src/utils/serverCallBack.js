export const loadData = (url,cb) => {
  const req = new XMLHttpRequest();
  
  req.onreadystatechange = () => {
    console.log("received", req.readyState, req.status);
    if(req.readyState === 4 && req.status === 200) {
      cb(JSON.parse(req.responseText));
    }
  }
  
  req.open("GET", url, true);
  req.send();
}