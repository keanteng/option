'use client';

import { useEffect, useState } from 'react';
import { ProductDataType } from '@/lib/product-data';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDataType;
}

export const DeleteModal: React.FC<AlertModalProps> = ({ isOpen, onClose, product }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleDelete = () => {
    alert('Product deleted');
  }

  return (
    <Modal
      title="Are You Sure?"
      description="This action cannot be undone. The product will be permanently deleted and this action is irreversible."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};