export class Itens {
    private _nome : string;
    private _lancamento! : number;
    private _diretor! : string;
    private _temporadas! : number;
    private _genero! : number;
    private _tipo! : string;

    constructor(nome : string){
        this._nome = nome;
    }



    public get nome() : string {
        return this._nome;
    }

    public set nome(nome: string){
        this._nome = nome;
    }


    public get lancamento() : number {
        return this._lancamento;
    }

    public set lancamento(lancamento: number){
        this._lancamento = lancamento;
    }

    public get temporadas() : number {
        return this._temporadas;
    }

    public set temporadas(temporadas: number){
        this._temporadas = temporadas;
    }

    
    public get diretor() : string {
        return this._diretor;
    }

    public set diretor(diretor: string){
        this._diretor = diretor;
    }
    

    public get genero() : number {
        return this._genero;
    }

    public set genero(genero: number){
        this._genero = genero;
    }


    public get tipo() : string {
        return this._tipo;
    }

    public set tipo(tipo: string){
        this._tipo = tipo;
    }
}