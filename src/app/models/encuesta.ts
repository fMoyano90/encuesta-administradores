export class Encuesta {
    constructor(
    public id: number,
    public admin_id: number,
    public respuesta: string,
    public objecion: string,
    public comentario: string,
    public length?: any
    ) {}
}