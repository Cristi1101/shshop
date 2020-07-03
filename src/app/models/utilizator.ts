import { ViewContainerRef, ElementRef } from '@angular/core';

export interface Utilizator{
    key?: string;
    username?: string;
    email: string;
    //password: string;
    isAdmin?: boolean;
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    postalCode: number;
    img: string;
}