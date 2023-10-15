import { spotifyAuth } from "../spotifyAppAuth.js";
import { spotifyAPI } from "../spotifyAppData.js";

class mainApp{
    constructor(){
        // account data
        this.token
        this.user
        // app data
        this.spotifyAPI
        this.spotifyAuth = new spotifyAuth()
        // app function
        this.checkLogin(this.token)
    }
    checkLogin(appToken){
        chrome.storage.local.get(['token']).then(localToken => {
            if((localToken != null || localToken != undefined) && (localToken.token != null || localToken.token != undefined)){
                this.setDataApi(localToken.token)
            }
        })
        document.querySelectorAll('#login-sect .btn').forEach(btn => {
            if(btn == document.querySelector('#login-sect .login-token')){
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.spotifyAuth.clientId}&response_type=code&redirect_uri=${this.spotifyAuth.redirectUri}&show_dialog=true&scope=${this.spotifyAuth.scopes}`
            } else if(btn == document.querySelector('#login-sect .login-token')){
                while(appToken == '' || appToken == null || appToken == undefined){
                    appToken = prompt('Enter API from your account')
                    this.setDataApi(appToken)
                }
            }
        });
    }
    setDataApi(appToken){
        this.spotifyAPI = new spotifyAPI(appToken)  
        chrome.storage.local.set({ token: appToken }).then(()=> {console.log(appToken)})
        document.querySelector('#login-sect').style.display = 'none'

        this.getdataApi(this.spotifyAPI)
    }
    getdataApi(api){

    }
}

window.mainApp = new mainApp()