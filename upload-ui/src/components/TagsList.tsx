import React from "react";
import Tag from "./Tag";
import Stack from "react-bootstrap/Stack";

interface TagsListProps {
  tags: { value: string; checked: boolean }[];
  name: string;
}

const TagsList: React.FC<TagsListProps> = ({ tags, name }) => {
  if (!tags) return null;

  return (
    <Stack direction="horizontal" gap={2}>
      {tags.map((tag) => (
        <Tag
          key={tag.value}
          value={tag.value}
          name={name}
          checked={tag.checked}
        />
      ))}
    </Stack>
  );
};

export default TagsList;
