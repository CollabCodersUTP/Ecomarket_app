"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "./utils";
import { buttonVariants } from "./button";
import {ReactElement} from "react";

function AlertDialog({...props}:
                     React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

const AlertDialogTrigger = React.forwardRef<
    React.ComponentRef<typeof AlertDialogPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
    >(({... props}, ref) => {
    return (
        <AlertDialogPrimitive.Trigger ref ={ref} data-slot = "alert-dialog-trigger" {... props} />
    );
});

const AlertDialogOverlay = React.forwardRef<
    React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
    >(({className, ... props}, ref ) =>{
      return (
          <AlertDialogPrimitive.Overlay
              ref={ref}
              data-slot="alert-dialog-overlay"
              className= {className}
              style={{
                  position: "fixed",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000,
              }}
              {...props}
          />
      )
})

function AlertDialogPortal({...props}:
                           React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
    return (
        <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
    );
}

const AlertDialogContent = React.forwardRef<
    React.ComponentRef<typeof AlertDialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {maxWidth? : string}
    >(({className, maxWidth,... props}, ref) => {
        return (
            <AlertDialogPortal>
                <AlertDialogOverlay/>
              <AlertDialogPrimitive.Content
                  ref={ref}
                  data-slot="alert-dialog-content"
                  className={className}
                  style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "white",
                      padding: "24px",
                      zIndex: 1001,
                      width: "90vw",
                      maxWidth: maxWidth || "450px",
                      borderRadius: "8px"
                  }}
                  {...props}
              >
                  {props.children}
              </AlertDialogPrimitive.Content>
            </AlertDialogPortal>
        )
    })

const AlertDialogTitle = React.forwardRef<
    React.ComponentRef<typeof AlertDialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
    >(({className, ... props}, ref ) =>{
      return (
          <AlertDialogPrimitive.Title
              ref={ref}
              data-slot="alert-dialog-title"
              className={cn("text-lg font-semibold", className)}
              {...props}
          />
      )
})

const AlertDialogDescription = React.forwardRef<
    React.ComponentRef<typeof AlertDialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & {size?: string}
    >(({className,size,... props}, ref) =>{
      return (
          <AlertDialogPrimitive.Description
              ref={ref}
              data-slot="alert-dialog-description"
              className={cn("text-muted-foreground text-sm", size, className)}
              {...props}
          />
      )
})

const AlertDialogAction = React.forwardRef<
    React.ComponentRef<typeof AlertDialogPrimitive.Action>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
    >(({className,... props}, ref) =>{
      return (
          <AlertDialogPrimitive.Action
              ref={ref}
              className={cn(buttonVariants(), className)}
              {...props}
          />
      )
})

const AlertDialogCancel = React.forwardRef<
    React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
    >(({className,... props}, ref) =>{
      return (
          <AlertDialogPrimitive.Cancel
              ref={ref}
              className={cn(buttonVariants({ variant: "outline" }), className)}
              {...props}
          />
      )
})

function AlertDialogHeader({className, ...props}:
                           React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({className, ...props}:
                           React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
