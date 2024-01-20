import io from 'socket.io-client'
import { API_BASE_URL } from '../config/urls'

const SOCKET_URL = API_BASE_URL

class WSService {

    initialzeSocekt = async () => {
        try {
            this.socket = io(SOCKET_URL, {
                transports: ["websocket"]
            })

            console.log("initialzing socket",this.socket)
        
            this.socket.on("connect", (data)=>{
                console.log("=== socket connected ===")
            })
            this.socket.on("disconnect", (data)=>{
                console.log("=== socket disconnected ===")
            })
            this.socket.on("error", (data)=>{
                console.log("=== socket error ===",data)
            })

        } catch (error) {
            console.log("=== socket is not initialized ===",error)
        }
    }

    on(event, data ={}){
        this.socket.on(event, data)
    }
    emit(event, cb){
        this.socket.emit(event, cb)
    }
    removeListener(listName){
        this.socket.removeListener(listName)
    }
}

const socketServices = new WSService()
export default socketServices

