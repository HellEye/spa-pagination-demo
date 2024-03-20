import { Link } from "@tanstack/react-router";
import { buttonVariants } from "./button";
import { cx } from "class-variance-authority";

type Props = {
  page: number;
  totalPages?: number;
  className?: string;
};

//TODO add tanstack router to paginated query component to sync with url

const PaginationComponent = ({ page, totalPages, className }: Props) => {
  return (
    <div className={cx("flex flex-row w-full", className)}>
      <div className={"flex flex-row gap-2 ml-auto"}>
        {/* First page */}
        {page !== 1 && (
          <Link
            to="."
            className={buttonVariants({ variant: "outline" })}
            search={{
              page: 1,
            }}
          >
            1
          </Link>
        )}
        {/* Previous page */}
        {page > 2 && (
          <Link
            to="."
            className={buttonVariants({ variant: "outline" })}
            search={{
              page: page - 1,
            }}
          >
            {page - 1}
          </Link>
        )}
        {/* Current page */}
        <Link
          to="."
          className={buttonVariants({ variant: "ghost" })}
          search={{
            page: page,
          }}
          disabled
        >
          {page}
        </Link>

        {/* Next Page */}
        {totalPages !== undefined && page < totalPages - 1 && (
          <Link
            to="."
            className={buttonVariants({ variant: "outline" })}
            search={{
              page: page + 1,
            }}
          >
            {page + 1}
          </Link>
        )}

        {/* Last Page */}
        {totalPages !== undefined && page !== totalPages && (
          <Link
            to="."
            className={buttonVariants({ variant: "outline" })}
            search={{
              page: totalPages,
            }}
          >
            {totalPages}
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaginationComponent;
