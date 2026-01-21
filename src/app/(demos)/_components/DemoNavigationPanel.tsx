"use client";

import BackButton from "@/components/BackButton";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button, useDisclosure } from "@heroui/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DemoNavigationPanelProps {
  backRoute: string;
  editRoute?: string;
  delete?: {
    onDelete?: () => Promise<unknown>;
    recordType: string;
    recordTitle: string;
  };
}

export default function DemoNavigationPanel(props: DemoNavigationPanelProps) {
  const router = useRouter();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isDeleting, setisDeleting] = useState<boolean>(false);
  const handleEdit = () => props.editRoute && router.push(props.editRoute);
  const handleDelete = () => {
    setisDeleting(true);
    props.delete?.onDelete?.().finally(() => {
      setisDeleting(false);
      onClose();
    });
  };
  return (
    <div className="flex justify-between w-full grow items-middle mb-4">
      <BackButton route={props.backRoute} />
      {(props.delete || props.editRoute) && (
        <div className="flex gap-4">
          {props.editRoute && (
            <Button
              data-testid="course-outline-list-button-edit"
              variant="flat"
              startContent={<Edit2 size={18} />}
              onPress={handleEdit}
            >
              Edit
            </Button>
          )}
          {props.delete && (
            <>
              <Button
                data-testid="course-outline-list-button-delete"
                color="danger"
                onPress={onOpen}
                isDisabled={isDeleting}
                aria-label="Delete course"
              >
                <Trash2 size={18} /> Delete
              </Button>
              <ConfirmationDialog
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleDelete}
                isExecuting={isDeleting}
                title="Confirm Deletion"
                confirmButtonColor="danger"
                confirmButtonText="Delete"
                message={
                  <p className="text-gray-700">
                    Are you sure you want to permanently delete this{" "}
                    {props.delete.recordType}?
                    <span className="block mt-1 font-semibold">
                      {props.delete.recordTitle || "Unknown Record"}
                    </span>
                    This action cannot be undone.
                  </p>
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
