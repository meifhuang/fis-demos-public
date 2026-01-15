"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ViewSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  markdown: string;
}

export function ViewSourceModal({
  isOpen,
  onClose,
  title = "Source Material",
  markdown,
}: ViewSourceModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      scrollBehavior="inside"
      placement="center"
      isDismissable
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            </ModalHeader>

            <ModalBody className="bg-gray-50">
              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button aria-label="Close modal" color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
