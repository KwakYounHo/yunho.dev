"use client";

import { useState } from "react";

// ui components
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface RequestConrimProps {
  onConfirm: () => void;
}

const RequestConfirm = ({ onConfirm }: RequestConrimProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handle = () => {
    onConfirm();
    setOpen(false);
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button>작성 완료</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>등록 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            "취소" 를 누르시면 계속 작성하실 수 있습니다.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handle}>작성 완료</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default RequestConfirm;
