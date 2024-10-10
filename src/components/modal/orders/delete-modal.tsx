'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { OrderDataType } from '@/lib/order-data';
import { deleteOrder } from '@/lib/orders/actions';
import { useToast } from '@/hooks/use-toast';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDataType;
}

export const DeleteModal: React.FC<AlertModalProps> = ({ isOpen, onClose, order }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteOrder(order.id);
      toast({
        title: 'Order Deleted',
        description: `${order.customer_name}'s order has been deleted.`,
      });
      onClose();
    } catch (error: unknown) {
      console.error('Failed to delete product', error);
    }
  }

  return (
    <Modal
      title="Are You Sure?"
      description="This action cannot be undone. The order will be permanently deleted and this action is irreversible."
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