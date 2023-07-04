import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { BsPlusSquare, BsXSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addTag, removeTag } from "../redux/reducers/tags";

interface TagProps {
  value: string;
  name: string;
  checked: boolean;
  testFn?: any;
  onClick?: any;
}

const Tag: React.FC<TagProps> = ({
  value,
  name,
  checked = false,
  testFn,
  onClick: onClickFn,
}) => {
  const dispatch = useDispatch();
  const [checkedState, setCheckedState] = useState(checked);

  const onAdd = () => {
    setCheckedState(!checkedState);
    dispatch(addTag({ name, values: [value] }));
  };

  const onRemove = () => {
    setCheckedState(!checkedState);
    dispatch(removeTag({ name, values: [value] }));
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (testFn) testFn();
    if (checkedState) {
      if (onClickFn) return onClickFn(e, name, value) && onRemove();
      return onRemove();
    }
    return onAdd();
  };

  return (
    <Badge pill onClick={onClick} bg={checkedState ? "primary" : "secondary"}>
      {value}
      {checkedState ? <BsXSquare /> : <BsPlusSquare />}
    </Badge>
  );
};

export default Tag;
