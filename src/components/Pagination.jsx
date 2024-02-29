/* eslint-disable react/prop-types */
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

const Pagination = ({ setActivePage }) => {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      setActivePage(index); 
    },
  });

  const next = () => {
    setActive((prevActive) => {
      if (prevActive === 5) return prevActive;
      setActivePage(prevActive + 1);
      return prevActive + 1;
    });
  };

  const prev = () => {
    setActive((prevActive) => {
      if (prevActive === 1) return prevActive;
      setActivePage(prevActive - 1);
      return prevActive - 1;
    });
  };

  return (
    <div className="flex justify-center items-center gap-4 pt-5 pb-3">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((index) => (
          <IconButton key={index} {...getItemProps(index)}>
            {index}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
