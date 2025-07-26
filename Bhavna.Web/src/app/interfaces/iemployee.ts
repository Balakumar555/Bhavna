import { ISkill } from "./iskill";

export interface IEmployee {
    id:number,
    fullname: string,
    email: string,
    phone?: number,
    contactPreference:string,
    skills: ISkill[];
}
