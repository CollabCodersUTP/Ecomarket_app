import {Button} from "./button";
import {ReactNode, useEffect, useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger
} from "./alert-dialog";
import {deleteById} from "../util/requests";
import {toast} from "sonner";
import {Label} from "./label";
import {Input} from "./input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./select";
import {Textarea} from "./textarea";
import {Upload} from "lucide-react";

function Flex(props: { gap: string, mt: string, justify: string, children: ReactNode }) {
    return null;
}

function DeleteElement(token:string, url:string, id:number, index:number, elementArray, setElementArray, setOpenModal) {
    setOpenModal(false);

    const handleDelete = async() => {
        try {
            await deleteById(url,id, token);
            setElementArray(elementArray.filter((_, i) => i !== index));
            toast.success("Eliminado con exitosamente", {duration:2000});
        }catch(e){
            console.log("Error" + e.message)
        }
    }
    handleDelete().catch(e => console.log(e.message));
}


function EditElement(setOpenModal){
    setOpenModal(false)

    const handleEdit = async() => {
        try{
            const editResponse = true
        }catch (e){
            console.log(e.message)
        }
    }

}


export function ModalDeleteConfirmation(token:string, url:string, index:number, id:number , dataName:string, elementArray, setElementArray,openModal:boolean, setOpenModal ) {
    return (
        <AlertDialog open={openModal}>
            <AlertDialogContent>
                <AlertDialogTitle>Confirmacion</AlertDialogTitle>
                <AlertDialogDescription>Eliminara a {dataName}  </AlertDialogDescription>
                    <div style={{ marginTop: "16px", display: "flex", justifyContent:"end", gap: "8px" }}>
                        <AlertDialogCancel asChild onClick={() => setOpenModal(false)}>
                            <Button style={{backgroundColor:"#3B3B3B", color:"white"}}>Cancelar</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild onClick={() => DeleteElement(token, url, id, index, elementArray, setElementArray, setOpenModal)}>
                            <Button variant="solid" >Confirmar</Button>
                        </AlertDialogAction>
                    </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

/*
export function ModalEditConfirmation(bodyEdit: {}, url:string,openModal, setOpenModal) {

    return (
        <AlertDialog open={openModal}>
            <AlertDialogContent>
                <AlertDialogTitle>Editar {dataName}</AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="product-name">Nombre del Producto *</Label>
                        <Input
                            id="product-name"
                            placeholder="Ej: Aceite de Oliva Orgánico Extra Virgen"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Categoría *</Label>
                            <Select value={selectedCategory} onValueChange={handleSelectedChange}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    {category && category.map((categoria) => (
                                        <SelectItem key={categoria.categoriaId} value={categoria.nombreCategoria}>{categoria.nombreCategoria}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Certificaciones</Label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={esOrganico}
                                        onChange={(e) => setEsOrganico(e.target.checked)}
                                    />
                                    <span className="text-sm">Orgánico</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={esVegano}
                                        onChange={(e) => setEsVegano(e.target.checked)}
                                    />
                                    <span className="text-sm">Vegano</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción Ecológica *</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe las características ecológicas de tu producto, origen, proceso de producción sostenible..."
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Precio (€) *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock Inicial *</Label>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="0"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sku">SKU (opcional)</Label>
                            <Input id="sku" placeholder="Código interno (opcional)" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Imágenes del Producto *</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-foreground mb-1">
                                Arrastra imágenes aquí o haz clic para seleccionar
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Recomendado: imágenes de alta calidad (mín. 800x800px)
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"> Publicar Producto </Button>
                        <Button type="button" variant="outline"> Guardar como Borrador </Button>
                    </div>
                    <div style={{ marginTop: "16px", display: "flex", justifyContent:"end", gap: "8px" }}>
                        <AlertDialogCancel asChild onClick={() => setOpenModal(false)}>
                            <Button style={{backgroundColor:"#3B3B3B", color:"white"}}>Cancelar</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button variant="solid" >Confirmar</Button>
                        </AlertDialogAction>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

 */

