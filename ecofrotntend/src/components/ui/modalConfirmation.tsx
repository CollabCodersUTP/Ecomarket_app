import {Button} from "./button";
import {ReactNode, useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger
} from "./alert-dialog";
import {deleteById} from "../util/requests";
import {log} from "node:util";

function Flex(props: { gap: string, mt: string, justify: string, children: ReactNode }) {
    return null;
}

export function ModalOperationState(childModal: boolean, setChildModal ) {
    return(
        <AlertDialog open={childModal}>
            <AlertDialogContent>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogDescription>
                    Elemento eliminado exitosamente
                </AlertDialogDescription>
                <AlertDialogAction asChild onClick={() => setChildModal(false)}>
                    <Button>Ok</Button>
                </AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function DeleteElement(url:string, id:number, index:number, elementArray, setElementArray, setOpenModal,setChildModal) {
    setOpenModal(false);

    const handleDelete = async() => {
        try {
            const response =  await deleteById(url,id);
            setElementArray(
                elementArray.filter((_, i) => i !== index)
            );
            setChildModal(response);
        }catch(e){
            console.log("Error" + e.message)
        }
    }
    handleDelete().catch(e => console.log(e.message));
}

export function ModalDeleteConfirmation(url:string, index:number, id:number , dataName:string, elementArray, setElementArray,openModal:boolean, setOpenModal,setChildModal ) {
    return (
        <AlertDialog open={openModal}>
            <AlertDialogContent>
                <AlertDialogTitle>Confirmacion</AlertDialogTitle>
                <AlertDialogDescription>Eliminara a {dataName}  </AlertDialogDescription>
                    <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                        <AlertDialogCancel asChild onClick={() => setOpenModal(false)}>
                            <Button variant="soft" >Cancelar</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild onClick={() => DeleteElement(url, id, index, elementArray, setElementArray, setOpenModal, setChildModal)}>
                            <Button variant="solid" >Confirmar</Button>
                        </AlertDialogAction>
                    </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

