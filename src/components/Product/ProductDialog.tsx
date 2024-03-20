import { Product } from "@/types/Product";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type Props = {
  product?: Product;
  onClose: () => void;
};

const ProductDialog = ({ product, onClose }: Props) => {
  if (!product) return null;
  return (
    <Dialog open={!!product} onOpenChange={onClose} modal>
      <DialogClose onClick={onClose} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product.id} - {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 items-center">
          <p>Year</p>
          <p>{product.year}</p>
          <p>Color</p>
          <div className="flex flex-row gap-4 items-center">
            <p>{product.color}</p>
            <div
              className="w-8 h-8"
              style={{ backgroundColor: product.color }}
            />
          </div>
          <p>Pantone Value</p>
          <p>{product.pantone_value}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
