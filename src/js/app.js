class app{
    constructor(){
        this.app = express()
        this.middlawares()
        this.routes()
    }
    
    middlawares(){
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:true}))
   }

routes(){
    this.app.use("/",homeRoutes)
    this.app.use("/usuario",usuarioRoutes)
  }
}

export default new app().app