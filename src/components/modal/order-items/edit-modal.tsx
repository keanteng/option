'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { OrderItemDataType } from '@/lib/order-item-data';
import OrderItemEditForm from '@/components/orders/order-items/order-item-edit-form';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    order_item: OrderItemDataType;
  }

  export const EditModal: React.FC<AlertModalProps> = ({ isOpen, onClose, order_item }) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  
    return (
      <Modal
        title="View Order Item"
        description="You can edit the order item details here."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <OrderItemEditForm onClose={onClose} order_item={order_item} />
        </div>
      </Modal>
    );
  };