export class Usuario {

    constructor(
        public uid: string,
        public nombre: string,
        public email: any  // Con string me da error cuando 
                            // cuando lo paso como parametro
    ){}
}