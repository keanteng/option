'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import ProductEditForm from '../../products/product-edit-form';
import { ProductDataType } from '@/lib/product-data';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDataType;
}

export const EditModal: React.FC<AlertModalProps> = ({ isOpen, onClose, product }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="View Product"
      description="You can edit the product details here."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <ProductEditForm product={product} onClose={onClose}/>
      </div>
    </Modal>
  );
};