export interface CompanyFileModel {
    denominacion: string;
    nombreComercial: Array<string>;
    domicilioSocial: string;
    localidad: string;
    formaJuridica: string;
    cnae: string;
    fechaUltimoBalance: string;
    identificativo: string;
    situacion: string;
    telefono: Array<number>;
    fax: Array<number>;
    web: Array<string>;
    email: string;
    cargoPrincipal: string;
    capitalSocial: number;
    ventas: number;
    anioVentas: number;
    empleados: number;
    fechaConstitucion: string;
}
