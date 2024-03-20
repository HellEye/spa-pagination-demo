import { Link } from "@tanstack/react-router";
import { buttonVariants } from "./button";
import { cx } from "class-variance-authority";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  page: number;
  totalPages?: number;
  className?: string;
};

const PaginationComponent = ({ page, totalPages, className }: Props) => {
  return (
    <div className={cx("flex flex-row w-full", className)}>
      <div className={"flex flex-row gap-2 ml-auto"}>
        {/* Previous page */}
        <Link
          to="."
          className={buttonVariants({
            variant: page === 1 ? "ghost" : "outline",
          })}
          search={(prev) => ({
            ...prev,
            page: page - 1,
          })}
          disabled={page === 1}
        >
          <ArrowLeft />
        </Link>
        {/* Next Page */}
        <Link
          to="."
          className={buttonVariants({
            variant: page === totalPages ? "ghost" : "outline",
          })}
          search={(prev) => ({
            ...prev,
            page: page + 1,
          })}
          disabled={page === totalPages}
        >
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default PaginationComponent;
