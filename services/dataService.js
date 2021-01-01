

const serverBaseUrl= 'https://mk7t0lal8k.execute-api.eu-west-3.amazonaws.com';



export default {
    submitLogin : async  (email, password) =>{
        const url = serverBaseUrl + "/getUser";
        var sendData = JSON.stringify({
            'Email': String(email),
            'Password' : String(password ),
          });
        var Data ;
        await fetch(url, {method: 'POST', 
                mode: 'cors',
                headers: { 'Access-Control-Allow-Origin' : "*",
                'Accept': 'application/json',
                'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
            },
               body :JSON.stringify(
                  {body: {
                "Email": email,
                "Password" : password,
              }}
              )
            ,withCredentials: true ,} 
        ).then( (response)  => response.json()).then( data =>
                {   
                    Data = data;})
        return Data;
    },


    submitSignup : async  (email, password, nom, prenom, niveau) =>{
      const url = serverBaseUrl + "/SignUser";

      var Data ;
      await fetch(url, {method: 'POST', 
              mode: 'cors',
              headers: { 'Access-Control-Allow-Origin' : "*",
              'Accept': 'application/json',
              'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
          },
             body :JSON.stringify(
                {body: {
                  'Email': String(email),
                  'Password' : String(password ),
                  'Nom' : String(nom),
                  'Prenom' : String(prenom),
                  'Niveau' : String(niveau)
            }}
            )
          ,withCredentials: true ,} 
      ).then( (response)  => response.json()).then( data =>
              {   Data = data;})
      return Data;
  },

  submitCreateAsso : async  (Email, Name, Description) =>{
    const url = serverBaseUrl + "/addAsso";
    var Data ;
    
    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'Email': String(Email),
                'Nom' : String(Name),
                'Description' : String(Description)
          }}
          )
        ,withCredentials: true ,} 
    ).then( (response)  => response.json()).then( data =>
            {   Data = data;})
    return Data;
},

  getAssos : async(Email) =>{
    const url = serverBaseUrl + "/getAsso"
    var Data

    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'Email': String(Email),
          }}
          )
        ,withCredentials: true} 
    ).then( (response)  => response.json()).then( data =>
            { Data = data;
              
               })
    return Data;
  },
  getUsers : async(Text) =>{
    const url = serverBaseUrl + "/searchUser"
    var Data;

    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'Text': String(Text),
          }}
          )
        ,withCredentials: true ,} 
    ).then( (response)  => response.json()).then( data =>
            { 
              Data = data;
              
               })
    return Data;
  },

  getAssoInfo : async(assoID) => {
    const url = serverBaseUrl + "/getAssoInfo"
    var Data;

    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'assoID': String(assoID),
          }}
          )
        ,withCredentials: true ,} 
    ).then( (response)  => response.json()).then( data =>
            { 
              Data = data;
              
               })
    return Data;
  } ,
  addAssoCategory : async(categoryName, assoID) => {
    const url = serverBaseUrl + "/addAssoCategory"
    var Data;

    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'assoID': String(assoID),
                'categoryName' : String(categoryName) 
          }}
          )
        ,withCredentials: true ,} 
    ).then( (response)  => response.json()).then( data =>
            { Data = data;
            })
    return Data;
  },
  AddMemberToAsso : async(Email, categoryName, assoID) => {
    const url = serverBaseUrl + "/AddMemberToAsso"
    var Data;

    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'assoID': String(assoID),
                'categoryName' : String(categoryName),
                'Email': String(Email)
          }}
          )
        ,withCredentials: true ,} 
    ).then( (response)  => response.json()).then( data =>
            { Data = data;
            })
    return Data;
  },

  getProfil : async(Email) =>{
    const url = serverBaseUrl + "/getProfil"
    var Data

    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'Email': String(Email),
          }}
          )
        ,withCredentials: true ,} 
   ).then( (response)  => response.json()).then( data =>
    { Data = data;
       })
    return Data;
  },
  RemoveMember : async(Email, Category,assoID, Occurences  ) =>{
    const url = serverBaseUrl + "/RemoveMember"
    var Data

    await fetch(url, {method: 'POST', 
            mode: 'cors',
            headers: { 'Access-Control-Allow-Origin' : "*",
            'Accept': 'application/json',
            'Content-Type': ['text/plain;charset=UTF-8','application/json'] 
        },
           body :JSON.stringify(
              {body: {
                'Email': String(Email),
                'CategoryName' : String(Category),
                'assoID' : String(assoID),
                'Occurences' : Occurences,
                
          }}
          )
        ,withCredentials: true ,} 
   ).then( (response)  => response.json()).then( data =>
      { 
        console.log(data)
        Data = data;      
      
      })
    return Data;
  }
    




}

