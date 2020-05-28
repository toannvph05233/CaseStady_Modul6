import {RoleEntity} from './RoleEntity';

export interface UserPost {
    id?: number,
    userName?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    mobile?: string,
    email?: string,
    registeredAt?: number,
    lastLogin?: number,
    srcAvatar?: string,
    roleEntityList?: RoleEntity[]
}
