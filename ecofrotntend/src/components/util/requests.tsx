import {AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogTitle} from "../ui/alert-dialog";
import {useState} from "react";

export async function postElement(url:string, body:{}){
    try {
        const response = await fetch(`http://localhost:8080/api/${url}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok) {
            return await response.json();
        }
    }catch(e){
        console.log("Error", e.message)
    }
}

export async function deleteById(url:string, id:number){
    try {
        const response = await fetch(`http://localhost:8080/api/${url}/`+id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        if (response.status === 204) {
            return true;
        }
    }catch(e){
        console.log("Error", e.message)
    }
}

export async function getElements(url:string){
    try {
        const response = await fetch(`http://localhost:8080/api/${url}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok) {
            return await response.json();
        }
    }catch(e){
        console.log("Error", e.message)
    }
}