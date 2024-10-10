'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { OrderItemDataType } from '@/lib/order-item-data';
import { deleteOrderItem } from '@/lib/order-items/actions';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  order_item: OrderItemDataType;
}

export const DeleteModal: React.FC<AlertModalProps> = ({ isOpen, onClose, order_item }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteOrderItem(order_item.id)
      onClose();
    } catch (error: unknown) {
      console.error('Failed to delete product', error);
    }
  }

  return (
    <Modal
      title="Are You Sure?"
      description="This action cannot be undone. The order item will be permanently deleted and this action is irreversible."
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